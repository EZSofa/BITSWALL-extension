class Brick {
    constructor(source) {

    }
}

class BrickTemplate {
    constructor(source) {
        this.title = source.title || '';
        this.description = source.description || '';
        // put the defult image first
        this.image = source.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAF5SURBVHjazFY7bsMwDKUCAjmGhw4cPGXu3iHX6N7rdO4lOnRPxmxGIRQZcoxM6hRHlsWfYsDhZlgUKfI9Poa/3/cEmYXLkH/C4fsKry9bMBvJv1PXT76xFrT1covlsVLXA4rB43KBuWRQDFwpm7lanhZIwbULpITKs9UqfH3sEqxooWQB+zKhMunt/tLj5+nOGlIqSh4WEN+qcBnm5SYbgLEZVCRUzMGazaINjX4XfJhuUUa/dg9yVEldX3eOtgFzu1ej4uo0xKrQFCASBYngoUGE7lnvOMv1P08MzRcuKEh5YhtY2dBMszivAidMLhpOaKXN7uJsuVzUQJe6HsLPwLbzOdWwdQCNtD1PaZurpShG+fSaJUFtCeXBaw9D63ZjpmWxR+ogXNoIAM723RBZ0XEslxN/B23HClgWzZrzjF4KcEMcnlEN91sV2SWtpP5LCqiyoIrs2C6/FmyhC9Vk03wPqMeVTHUin+abE7jtb1r5uN5aGcPZ/wAIhLN5DcGsDwAAAABJRU5ErkJggg==";
        this.createTime = source.createTime || new Date().toISOString();
        this.id = source.id || '';

        if (source.bricks) {
            this.bricks = source.bricks.map((brick) => new Brick(brick));
        } else {
            this.bricks = []
        }
    }
}