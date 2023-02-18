import { useDispatch, useSelector } from 'react-redux';
import { handleFindContact } from 'redux/filterContactsSlice';
import { deleteContact } from 'redux/operations';
import { selectContacts, selectFilter } from 'redux/selectors';

import {
  ContactList,
  ItemsContact,
  DeleteBtn,
  Notification,
} from './ContactList.styled';

export const Contact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const query = useSelector(selectFilter);

  const getVisibleContact = () => {
    const normalizeFilter = query.toLocaleLowerCase();

    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContact = getVisibleContact();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
    dispatch(handleFindContact(''));
  };

  return (
    <ContactList>
      {contacts.length === 0 ? (
        <Notification>You have no contacts</Notification>
      ) : visibleContact.length === 0 ? (
        <Notification>contact not found</Notification>
      ) : (
        visibleContact.map(({ id, name, phone }) => (
          <ItemsContact key={id}>
            {name}: {phone}{' '}
            <DeleteBtn type="button" onClick={() => handleDeleteContact(id)}>
              delete
            </DeleteBtn>
          </ItemsContact>
        ))
      )}
    </ContactList>
  );
};
