export const authConfig = {
    // debug: true,
    pages: {
        signIn: '/login',
    },
    // session: {
    //     // Set to jwt in order to CredentialsProvider works properly
    //     strategy: 'jwt'
    // },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log('AUTHORIZED:', auth, nextUrl.pathname)
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            console.log('IS ON DASHBOARD', isOnDashboard)
            console.log('IS LOGGED IN', isLoggedIn)

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: []
};