const chalk = require('chalk');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const shell = require('shelljs');
const { decode, encode } = require('html-entities');

const APP_PATH = process.env.DEV_APP_PATH || process.cwd();
const PROMISE_DELAY = 200;

const pluralize = (count, noun, suffix = 'es') => `${count} ${noun}${count !== 1 ? suffix : ''}`;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const toRelativePath = absolutePath => path.relative(APP_PATH, absolutePath);
const encodeXmlEntities = name =>
  encode(name, { mode: 'nonAscii', level: 'xml', numeric: 'hexadecimal' });
const normalizePath = process.platform === 'win32' ? require('normalize-path') : p => p;

const getAndroidCurrentName = () => {
  const gradleFile = path.join(APP_PATH, 'android', 'settings.gradle');
  const gradleFileContent = fs.readFileSync(gradleFile, 'utf8');

  const projectName = gradleFileContent.match(/rootProject.name\s+=\s+['"](.*)['"]/)[1];

  if (projectName) {
    return projectName;
  }

  throw new Error(`Unable to get project name from settings.gradle for project ${APP_PATH}`);
};

/**
 * Get the name of the xcode project folder
 * e.g. "MyApp.xcodeproj" -> "MyApp"
 * @returns {string} The name of the xcode project folder
 */
const getIosXcodeProjectPathName = async () => {
  const { globbySync } = await import('globby')
  const xcodeProjectPath = globbySync(normalizePath(path.join(APP_PATH, iosXcodeproj)), {
    onlyDirectories: true,
  });

  const xcodeProjectPathName = xcodeProjectPath[0].split('/').pop();

  return xcodeProjectPathName.replace('.xcodeproj', '');
};

const renameFoldersAndFiles = async ({
                                       foldersAndFilesPaths,
                                       currentPath: currentPathParam,
                                       newPath: newPathParam,
                                       createNewPathFirst = false,
                                       shellMoveCurrentPathGlobEnd = '',
                                     }) => {
  const promises = foldersAndFilesPaths.map(async (filePath, index) => {
    await delay(index * PROMISE_DELAY);
    const currentPath = path.join(APP_PATH, filePath);
    const newPath = path.join(APP_PATH, filePath.replace(currentPathParam, newPathParam));

    if (currentPath === newPath) {
      return console.log(toRelativePath(currentPath), chalk.yellow('NOT RENAMED'));
    }

    if (createNewPathFirst) {
      shell.mkdir('-p', newPath);
    }

    try {
      new Promise(resolve => {
        if (!fs.existsSync(currentPath)) {
          return resolve();
        }

        const shellMove = shell.mv('-f', `${currentPath}${shellMoveCurrentPathGlobEnd}`, newPath);

        if (shellMove.code !== 0) {
          console.log(chalk.red(shellMove.stderr));
        }

        resolve();
        console.log(toRelativePath(newPath), chalk.green('RENAMED'));
      });
    } catch (error) {
      console.log(error);
    }
  });

  await Promise.all(promises);
};

const renameIosFoldersAndFiles = async newPathContentStr => {
  const currentPathContentStr = getIosXcodeProjectPathName();
  const foldersAndFilesPaths = getIosFoldersAndFilesPaths({
    currentPathContentStr,
    newPathContentStr,
  });

  await renameFoldersAndFiles({
    foldersAndFilesPaths,
    currentPath: currentPathContentStr,
    newPath: newPathContentStr,
  });
};

const updateFilesContent = async filesContentOptions => {
  const promises = filesContentOptions.map(async (option, index) => {
    await delay(index * PROMISE_DELAY);

    const isOptionFilesString = typeof option.files === 'string';
    const updatedOption = {
      ...option,
      countMatches: true,
      allowEmptyPaths: true,
      files: isOptionFilesString
        ? path.join(APP_PATH, option.files)
        : option.files.map(file => path.join(APP_PATH, file)),
    };

    try {
      const results = await replace(updatedOption);
      results.map(result => {
        const hasChanged = result.hasChanged;
        const message = `${hasChanged ? 'UPDATED' : 'NOT UPDATED'} (${pluralize(
          result.numMatches || 0,
          'match'
        )})`;
        console.log(
          toRelativePath(result.file),
          hasChanged ? chalk.green(message) : chalk.yellow(message)
        );
      });
    } catch (error) {
      const filePath = error.message.replace('No files match the pattern:', '').trim();
      console.log(toRelativePath(filePath), chalk.yellow('NOT FOUND'));
    }
  });

  await Promise.all(promises);
};

const updateIosFilesContent = async ({
                                       currentName,
                                       newName,
                                       currentPathContentStr,
                                       newPathContentStr,
                                       newBundleID,
                                     }) => {
  const filesContentOptions = getIosUpdateFilesContentOptions({
    currentName,
    newName,
    currentPathContentStr,
    newPathContentStr,
    newBundleID,
  });
  await updateFilesContent(filesContentOptions);
};

const updateAndroidFilesContent = async ({ currentName, newName }) => {
  const filesContentOptions = getAndroidUpdateFilesContentOptions({
    currentName,
    newName,
  });

  await updateFilesContent(filesContentOptions);
};

const iosXcodeproj = 'ios/*.xcodeproj';

const getIosFoldersAndFilesPaths = ({ currentPathContentStr, newPathContentStr }) => {
  const cleanNewPathContentStr = newPathContentStr;

  return [
    `ios/${currentPathContentStr}`,
    `ios/${cleanNewPathContentStr}/${currentPathContentStr}.entitlements`,
    `ios/${cleanNewPathContentStr}/${currentPathContentStr}Release.entitlements`,
    `ios/${currentPathContentStr}-tvOS`,
    `ios/${currentPathContentStr}-tvOSTests`,
    `ios/${currentPathContentStr}.xcworkspace`,
    `ios/${currentPathContentStr}Tests`,
    `ios/${cleanNewPathContentStr}Tests/${currentPathContentStr}Tests.m`,
    `ios/${currentPathContentStr}.xcodeproj`,
    `ios/${cleanNewPathContentStr}.xcodeproj/xcshareddata/xcschemes/${currentPathContentStr}-tvOS.xcscheme`,
    `ios/${cleanNewPathContentStr}.xcodeproj/xcshareddata/xcschemes/${currentPathContentStr}.xcscheme`,
    `ios/${currentPathContentStr}-Bridging-Header.h`,
  ];
};

const getIosUpdateFilesContentOptions = ({
                                           currentName,
                                           newName,
                                           currentPathContentStr,
                                           newPathContentStr,
                                           newBundleID,
                                         }) => {
  const encodedNewName = encodeXmlEntities(newName);
  const encodedCurrentName = encodeXmlEntities(currentName);
  const cleanNewPathContentStr = newPathContentStr;

  return [
    {
      files: 'ios/Podfile',
      from: [
        new RegExp(`\\b${currentPathContentStr}\\b`, 'g'),
        new RegExp(`\\b${currentPathContentStr}Tests\\b`, 'g'),
      ],
      to: [`${cleanNewPathContentStr}`, `${cleanNewPathContentStr}Tests`],
    },
    {
      files: ['ios/*/AppDelegate.mm', 'ios/*/AppDelegate.m'],
      from: [new RegExp(`@"${currentName}"`, 'g')],
      to: `@"${newName}"`,
    },
    {
      files: [
        'ios/*.xcodeproj/project.pbxproj',
        'ios/*.xcworkspace/contents.xcworkspacedata',
        'ios/*.xcodeproj/xcshareddata/xcschemes/*-tvOS.xcscheme',
        'ios/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme',
        'ios/*Tests/*Tests.m',
      ],
      from: [new RegExp(`\\b${currentPathContentStr}\\b`, 'g')],
      to: cleanNewPathContentStr,
    },
    {
      files: [
        'ios/*.xcodeproj/project.pbxproj',
        'ios/*Tests/*Tests.m',
        'ios/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme',
      ],
      from: new RegExp(`\\b${currentPathContentStr}Tests\\b`, 'g'),
      to: `${cleanNewPathContentStr}Tests`,
    },
    {
      files: 'ios/*.xcodeproj/project.pbxproj',
      from: [
        new RegExp(/INFOPLIST_KEY_CFBundleDisplayName = "(.*)"/, 'g'),
        new RegExp(`remoteInfo = ${cleanNewPathContentStr};`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}Tests.xctest\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}Tests.m\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}.app\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}/AppDelegate.h\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}/AppDelegate.mm\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}/Images.xcassets\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}/Info.plist\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}/main.m\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}/LaunchScreen.storyboard\\b`, 'gi'),
        new RegExp(`\\bpath = ${cleanNewPathContentStr}Tests\\b`, 'gi'),
        new RegExp(`name = ${newPathContentStr}Tests;`, 'gi'),
        new RegExp(`name = ${cleanNewPathContentStr};`, 'g'),
        new RegExp(`name = "${currentName}";`, 'g'),
        new RegExp(`productName = ${cleanNewPathContentStr};`, 'g'),
        new RegExp(`productName = "${currentName}";`, 'g'),
        new RegExp(`productName = ${newPathContentStr}Tests;`, 'g'),
        new RegExp(`INFOPLIST_FILE = ${cleanNewPathContentStr}Tests/Info.plist;`, 'g'),
        new RegExp(`INFOPLIST_FILE = ${cleanNewPathContentStr}/Info.plist;`, 'g'),
        new RegExp(`PRODUCT_NAME = "${currentName}";`, 'gi'),
        new RegExp(`PRODUCT_NAME = ${cleanNewPathContentStr};`, 'gi'),
        new RegExp(`${currentPathContentStr}Release.entitlements`, 'gi'),
      ],
      to: [
        `INFOPLIST_KEY_CFBundleDisplayName = "${newName}"`,
        `remoteInfo = "${cleanNewPathContentStr}";`,
        `path = "${cleanNewPathContentStr}Tests.xctest"`,
        `path = "${cleanNewPathContentStr}Tests.m"`,
        `path = "${cleanNewPathContentStr}.app"`,
        `path = "${cleanNewPathContentStr}/AppDelegate.h"`,
        `path = "${cleanNewPathContentStr}/AppDelegate.mm"`,
        `path = "${cleanNewPathContentStr}/Images.xcassets"`,
        `path = "${cleanNewPathContentStr}/Info.plist"`,
        `path = "${cleanNewPathContentStr}/main.m"`,
        `path = "${cleanNewPathContentStr}/LaunchScreen.storyboard"`,
        `path = "${cleanNewPathContentStr}Tests"`,
        `name = "${cleanNewPathContentStr}Tests";`,
        `name = "${cleanNewPathContentStr}";`,
        `name = "${cleanNewPathContentStr}";`,
        `productName = "${cleanNewPathContentStr}";`,
        `productName = "${cleanNewPathContentStr}";`,
        `productName = "${cleanNewPathContentStr}Tests;"`,
        `INFOPLIST_FILE = "${cleanNewPathContentStr}Tests/Info.plist";`,
        `INFOPLIST_FILE = "${cleanNewPathContentStr}/Info.plist";`,
        `PRODUCT_NAME = "${cleanNewPathContentStr}";`,
        `PRODUCT_NAME = "${cleanNewPathContentStr}";`,
        `${cleanNewPathContentStr}Release.entitlements`,
      ],
    },
    {
      files: 'ios/*.xcodeproj/project.pbxproj',
      processor: input => {
        const matchesDisplayName = input.match(/INFOPLIST_KEY_CFBundleDisplayName = "(.*)"/g);
        // If there is no display name, add it
        if (matchesDisplayName === null) {
          input = input.replace(
            new RegExp(`INFOPLIST_FILE = "${cleanNewPathContentStr}/Info.plist";`, 'g'),
            `INFOPLIST_FILE = "${cleanNewPathContentStr}/Info.plist";
             INFOPLIST_KEY_CFBundleDisplayName = "${newName}";`
          );
        }

        // Replace bundle ID
        if (newBundleID) {
          input = input.replace(
            /PRODUCT_BUNDLE_IDENTIFIER = "(.*)"/g,
            `PRODUCT_BUNDLE_IDENTIFIER = "${newBundleID}"`
          );

          input = input.replace(
            /PRODUCT_BUNDLE_IDENTIFIER = (.*)/g,
            `PRODUCT_BUNDLE_IDENTIFIER = "${newBundleID}";`
          );
        }

        return input;
      },
    },
    {
      files: 'ios/*/Base.lproj/LaunchScreen.xib',
      from: [
        new RegExp(`\\b${encodedCurrentName}\\b`, 'g'),
        new RegExp(`\\b${currentName}\\b`, 'g'),
      ],
      to: encodedNewName,
    },
    {
      files: 'ios/*/LaunchScreen.storyboard',
      from: [
        new RegExp(`text="${encodedCurrentName}"`, 'g'),
        new RegExp(`text="${currentName}"`, 'g'),
      ],
      to: `text="${encodedNewName}"`,
    },
  ];
};

const getAndroidUpdateFilesContentOptions = ({
                                               newName,
                                             }) => {
  return [
    {
      files: 'android/settings.gradle',
      from: [/rootProject.name = "(.*)"/g, /rootProject.name = '(.*)'/g],
      to: `rootProject.name = '${newName}'`,
    },
    {
      files: 'android/app/src/main/java/com/react_native_template_thunk_paper/MainActivity.java',
      from: [/return "(.*)"/g, /return '(.*)'/g],
      to: `return "${newName}"`,
    }
  ];
};

const getOtherUpdateFilesContentOptions = async ({
                                                   currentName,
                                                   newName
                                                 }) => {
  await updateFilesContent([
    {
      files: 'app.json',
      from: [/"name": "(.*)"/g, /"displayName": "(.*)"/g],
      to: [
        `"name": "${newName}"`,
        `"displayName": "${newName}"`
      ],
    },
  ])
};

let rename = async ({
                        name
                      }) => {
  try {
    console.log("APP_PATH", APP_PATH);
    const currentAndroidName = getAndroidCurrentName();
    const currentPathContentStr = await getIosXcodeProjectPathName();
    const newPathContentStr = name;

    await renameIosFoldersAndFiles(newPathContentStr);
    await updateIosFilesContent({
      currentName: currentAndroidName,
      newName: name,
      currentPathContentStr,
      newPathContentStr,
    });


    await updateAndroidFilesContent({
      currentName: currentAndroidName,
      newName: name,
    });

    fs.rename(`${APP_PATH}/ios/${currentAndroidName}`, `${APP_PATH}/ios/${name}`, console.log)
    fs.rename(`${APP_PATH}/ios/${currentAndroidName}.xcworkspace`, `${APP_PATH}/ios/${name}.xcworkspace`, console.log)
    fs.rename(`${APP_PATH}/ios/${currentAndroidName}.xcodeproj`, `${APP_PATH}/ios/${name}.xcodeproj`, (error) => {})
    await getOtherUpdateFilesContentOptions({
      currentName: currentAndroidName,
      newName: name
    })
    fs.rename(`${APP_PATH}/ios/${name}.xcodeproj/xcshareddata/xcschemes/${currentAndroidName}.xcscheme`, `${APP_PATH}/ios/${name}.xcodeproj/xcshareddata/xcschemes/${name}.xcscheme`, (error) => {})


  } catch (error) {
    console.log("error", error);
  }
};

exports.rename = rename;
