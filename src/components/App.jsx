import { ContactsList } from './contacts/contacts';
import { ModalCreateContact } from './form/form';
import { Filter } from './filter/filter';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ContactsList />
    </div>
  );
};
