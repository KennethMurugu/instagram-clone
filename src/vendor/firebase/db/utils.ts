import { LOCAL_STORAGE_KEY_USER_ACCOUNT } from '@/store'
import firebase from '@/vendor/firebase'
import { UserAccount } from './models'

export function getUserProfilePhotoFromStorage(
  forCurrentUser = true,
  anotherAccount: UserAccount = {}
) {
  let userAccount: UserAccount
  if (forCurrentUser) {
    userAccount = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_USER_ACCOUNT)!
    )
  } else {
    userAccount = anotherAccount
  }

  return firebase
    .storage()
    .ref(`/profile_photos/${userAccount.profile_photo}`)
    .getDownloadURL()
}
