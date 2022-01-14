class Helper {
    generate_string() {
        return (Math.random() + 1).toString(36).substring(7)
    }
}

module.exports = new Helper()