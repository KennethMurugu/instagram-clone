export function isUserLoggedIn(vm:Vue){
    return Object.keys(vm.$store.state.userAccount).length !== 0
}