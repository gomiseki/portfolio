import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        palette: {
            border: string,
            borderDark:string,
            fontColor: string,
            fontColorLight: string,
            fontSky: string,
        },
        devices: {
            desktop: string,
            mobile: string,
        },
    }
}
