const styleSheet = {
    customTheme(theme: any) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'orange',
                primary: 'purple'
            }
        }
    }
}

export default styleSheet;