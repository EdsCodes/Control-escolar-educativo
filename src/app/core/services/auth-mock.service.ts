export class AuthMockService {
    login() {
        console.log('Se ejecuto los service fake.')
        return {
            name: 'TEST USER',
            EMAIL: '...',
        };
    }
}