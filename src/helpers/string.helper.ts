export namespace StringHelper {

    export const removeVietnameseTones = (str: string) => {
        if (!str) {
            return ""
        }
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    export const parseJSON = (str?: string) => {
        if (!str) {
            return {}
        }
        try {
            const res = JSON.parse(str)
            return res
        } catch (error) {
            return {}
        }
    }

    export function opacity(color: string, opacity: number): string {
        // coerce values so ti is between 0 and 1.
        const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }

    export function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    /**
     * Return true, if @param n is valid number
     *
     * @param n is number
     */
    export function isNonEmptyNumber(n: number | undefined | null) {
        if (n == undefined || n == null) {
            return false;
        }
        return true;
    }

    /**
     * Return true, if @param s is valid string
     *
     *  @param s is string
     */
    export function isNonEmptyString(s: string | undefined | null) {
        if (s == undefined || s == null || s == '') {
            return false;
        }
        return true;
    }

    export const isNullOrEmpty = (value: any) => {
        return !(typeof (value) !== 'undefined' || value != null);
    };

// check null or Undefinded
    export const isNullOrUndefined = (data: any) => {
        return (data == null || data === undefined);
    };

    export const convertNumber = (n, convertB = true, convertM = true, convertK = true) => {
        const number = isNaN(Number(n)) ? 0 : Number(n)
        if (number >= 1000000000 && convertB) {
            if (number % 1000000000 === 0) {
                return `${(number / 1000000000)}B`
            }
            return `${(number / 1000000000).toFixed(1)}B`
        }
        if (number >= 1000000 && convertM) {
            if (number % 1000000 === 0) {
                return `${(number / 1000000)}M`
            }
            return `${(number / 1000000).toFixed(1)}M`
        }
        if (number >= 1000 && convertK) {
            if (number % 1000 === 0) {
                return `${(number / 1000)}k`
            }
            return `${(number / 1000).toFixed(1)}k`
        }
        return `${Math.max(number, 0)}`
    }


    export const isNotNumberString = (value: string) => {
        return isNaN(parseInt(value.trim())) || value.trim() !== `${parseInt(value.trim())}`
    }

    export function getValueFromPath(obj, path) {
        // Chia chuỗi thành mảng keys
        const keys = path.split('.').map(key => {
            // Nếu key chứa dấu "[" thì loại bỏ nó để lấy chỉ số
            const matches = key.match(/(.+?)\[(\d+)\]/);
            if (matches) {
                return {
                    key: matches[1],
                    index: parseInt(matches[2])
                };
            } else {
                return {key};
            }
        });

        // Truy cập giá trị trong object
        let value = obj;
        for (const keyInfo of keys) {
            if (value && value?.hasOwnProperty(keyInfo?.key)) {
                if (keyInfo.hasOwnProperty('index')) {
                    value = value[keyInfo.key][keyInfo?.index];
                } else {
                    value = value[keyInfo.key];
                }
            } else {
                // Nếu key không tồn tại trong object, trả về giá trị mặc định hoặc null
                return null;
            }
        }

        return value;
    }

    export function setNestedValue(obj, path, value) {
        const pathArray = path.split('.'); // Chuyển đường dẫn thành một mảng các phần tử
        let currentObj = obj;

        // Duyệt qua từng phần tử trong đường dẫn
        for (let i = 0; i < pathArray.length - 1; i++) {
            const key = pathArray[i];
            if (!currentObj[key]) {
                currentObj[key] = {}; // Tạo một đối tượng nếu nó không tồn tại
            }
            currentObj = currentObj[key]; // Di chuyển đến đối tượng con
        }

        // Gán giá trị cuối cùng trong đường dẫn
        currentObj[pathArray[pathArray.length - 1]] = value;
    }

    export function toHHMMSS(secs: number) {
        let hours = Math.floor(secs / 3600)
        let minutes = Math.floor(secs / 60) % 60
        let seconds = secs % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            // .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    export function truncateStringLogBugs(inputString: string, maxLength: number) {
        // Kiểm tra độ dài của chuỗi
        if (inputString.length <= maxLength) {
            return inputString; // Trả về nguyên chuỗi nếu độ dài không vượt quá giới hạn
        }

        // Tách chuỗi thành mảng các giá trị
        const values = inputString.split('|').filter(Boolean);

        // Xóa các giá trị đầu chuỗi để giảm độ dài xuống dưới giới hạn
        while (inputString.length > maxLength) {
            values.shift();
            inputString = values.join('|');
        }

        return inputString;
    }

    export function replaceLastOccurrencesColor(inputString, targetChar, replacementChar) {

        if (inputString?.length <= 7) {
            return `${inputString}${replacementChar}`
        }
        const reversedInput = inputString?.split('').reverse().join('');
        const reversedTargetChar = targetChar?.split('').reverse().join('');
        const reversedReplacementChar = replacementChar?.split('').reverse().join('');

        const reversedResult = reversedInput?.replace(reversedTargetChar, reversedReplacementChar);
        const result = reversedResult?.split('').reverse().join('');

        return result;
    }

    export const removeCharPhone = (inputString: string) => {
        let cleanedString = inputString.replace(/[\+\- ]+/g, '');

        if (cleanedString.startsWith('84')) {
            cleanedString = cleanedString.replace('84', '');
        }

        return cleanedString;
    }


    export const convertDataCadastral = (data: any) => {
        const dataArray: Array<any> = []
        if (data !== undefined && data !== null) {
            Object.keys(data).forEach(key => {
                dataArray.push(data[key])
            })
            return dataArray
        }
    }

    export const generateRandomString = () => {
        return Math.random().toString(36).substr(2, 6);
    }

    export function getExtensionFileByPath(filePath: string){
        const parts = filePath.split('.');
        if (parts.length > 1) {
            return parts.pop();
        }
        return '';
    }
}