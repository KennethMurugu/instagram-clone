import firebase from '@/vendor/firebase'
import { UserAccount } from './models'

export function getUserProfilePhotoFromStorage(
  forCurrentUser = true,
  anotherAccount: UserAccount = {}
) {
  let userAccount: UserAccount
  if (forCurrentUser) {
    userAccount = JSON.parse(
      sessionStorage.getItem('instagram-clone-user-account')!
    )
  } else {
    userAccount = anotherAccount
  }

  return firebase
    .storage()
    .ref(`/profile_photos/${userAccount.profile_photo}`)
    .getDownloadURL()
}
