import React, {useMemo} from "react";
import {StyleProp, TextStyle} from "react-native";
import {Text} from "react-native-paper";

interface IBTextMultiProps extends Omit<React.ComponentProps<typeof Text>, "children" | "style"> {
    children?: React.ReactNode,
    text?: string
    [key: string]: any
}


type TMultiStyles = {
    [key in `style${1 | 2 | 3 | 4 | 5}`]?: StyleProp<TextStyle>
}


/**
 * If you want to have different styles in the same text, use the ||| separator (e.g., Hello |||every|||body).
 * Additionally, provide style1, style2, ...stylex (unlimited x) corresponding to the number of text segments when we split the string by the ||| character.
 * @param text
 * @param children
 * @param props
 * @constructor
 */
export default function BTextMulti({text, children, ...props}: IBTextMultiProps & TMultiStyles) {

    const content = useMemo(() => {
        return text || children || ""
    }, [text, children])

    const renderMultiText = () => {
        let contentSegments = (content as string).split("|||")
        let currentStyle: StyleProp<TextStyle> | undefined = undefined
        return contentSegments.map((contentSegment, index) => {
            currentStyle = props[`style${(Math.min(index, 21)) + 1}`] || {}
            return <Text key={index.toString()} style={currentStyle}>{contentSegment}</Text>
        })
    }

    return (
        <Text {...props}>
            {typeof content !== "string" ?
                content
                :
                renderMultiText()
            }
        </Text>
    );
}
