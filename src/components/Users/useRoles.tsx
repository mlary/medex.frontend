import { useTranslation } from 'react-i18next';
import { EnumUserRoles } from '../../constants/enumUserRoles';

const useRoles = () => {
  const { t } = useTranslation();
  return {
    roles: [
      { id: EnumUserRoles.Administrator, name: t('Administrator') },
      { id: EnumUserRoles.Client, name: t('Client') },
      { id: EnumUserRoles.Guest, name: t('Guest') },
      { id: EnumUserRoles.Markerter, name: t('Markerter') },
    ],
  };
};
export default useRoles;
