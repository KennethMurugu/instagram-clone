import firebase from '@/vendor/firebase'
import { UserAccount } from './models'

export function getUserAccountFromStorage():UserAccount {
  return JSON.parse(sessionStorage.getItem('instagram-clone-user-account')!)
}

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

export function watchForUserAccountChanges() {
  const uid = sessionStorage.getItem('instagram-clone-uid')
  firebase
    .database()
    .ref(`accounts/${uid}`)
    .on('value', snapshot => {
      console.log(
        '[watchForUserAccountChanges] Detected change on user account...'
      )
      if (snapshot.exists()) {
        const userAccount = snapshot.toJSON()!
        sessionStorage.setItem(
          'instagram-clone-user-account',
          JSON.stringify(userAccount)
        )
      } else {
        console.error('[watchForUserAccountChanges] Snapshot is empty')
      }
    })

  console.log('Watching for user account changes...')
}

export function disableUserAccountChangesCallback() {
  const uid = sessionStorage.getItem('instagram-clone-uid')
  firebase
    .database()
    .ref(`accounts/${uid}`)
    .off('value')

  console.log('Disabled callback for user account changes...')
}
