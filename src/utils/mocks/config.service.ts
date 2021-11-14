const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600'
      default:
        break
    }
  }
}

export default mockedConfigService