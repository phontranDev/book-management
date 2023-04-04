// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar() {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <MAvatar
          src={user?.avatar !== null ? `${process.env.REACT_APP_BASE_URL}/${user.avatar?.path} ` : ''}
          alt={user.name}
          color={user?.avatar !== null ? 'default' : createAvatar(user.name).color}
        >
          {createAvatar(user.name).name}
        </MAvatar>
      )}
    </>
  );
}
