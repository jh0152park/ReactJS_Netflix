interface DefaultTheme {
    red: string;
    black: {
        deepDark: string;
        darker: string;
        lighter: string;
    };
    white: {
        darker: string;
        lighter: string;
    };
}

export const theme: DefaultTheme = {
    red: "#E51013",
    black: {
        deepDark: "#141414",
        darker: "#181818",
        lighter: "#2F2F2F",
    },
    white: {
        darker: "#E5E5E5",
        lighter: "#FFF",
    },
};
