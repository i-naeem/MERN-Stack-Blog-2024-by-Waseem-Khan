import React, {useRef} from 'react';
import {Button, Label, TextInput, Textarea} from 'flowbite-react';
import {useNavigate, useParams} from 'react-router-dom';
import {useUserContext} from '../context/UserContext';
import {Error} from '../components/Error';

const EditUser = () => {
  const {getUser, error, loading, updateUser} = useUserContext();
  const navigate = useNavigate();
  const {user_id} = useParams();
  const user = getUser(user_id);

  const userRef = useRef();
  const emailRef = useRef();
  const twitterRef = useRef();
  const linkedinRef = useRef();
  const bioRef = useRef();

  const editUser = async (e) => {
    e.preventDefault();
    updateUser(user_id, {
      name: userRef.current.value,
      email: emailRef.current.value,
      twitter: twitterRef.current.value,
      linkedin: linkedinRef.current.value,
      bio: bioRef.current.value,
    }).then((status) => alert(`Updated ${status}`));
  };

  if (loading) {
    return 'Loading';
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit User</h2>

        <form
          action="#"
          onSubmit={editUser}
          encType="multipart/form-data"
          className="flex w-full flex-col gap-4"
        >
          <Error error={error} />
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-2 ">
            <div className="name">
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Your Name"
                />
              </div>
              <TextInput
                ref={userRef}
                defaultValue={user?.profile.name}
                id="name"
                type="text"
                placeholder="Waseem Khan"
                required
              />
            </div>
            <div className="email">
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Email"
                />
              </div>
              <TextInput
                ref={emailRef}
                defaultValue={user?.email}
                id="email"
                type="email"
                placeholder="hello@waseemk.com"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-2 ">
            <div className="twitter">
              <div className="mb-2 block">
                <Label
                  htmlFor="twitter"
                  value="Twitter"
                />
              </div>
              <TextInput
                ref={twitterRef}
                defaultValue={user?.profile.socialLinks.twitter}
                id="twitter"
                type="text"
                placeholder="@WasimKhan96"
                required
              />
            </div>
            <div className="linkedin">
              <div className="mb-2 block">
                <Label
                  htmlFor="linkedin"
                  value="LinkedIn"
                />
              </div>
              <TextInput
                ref={linkedinRef}
                defaultValue={user?.profile.socialLinks.linkedin}
                id="linkedin"
                type="text"
                placeholder="@wasimkhan96"
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="bio"
                value="Biography"
              />
            </div>
            <Textarea
              ref={bioRef}
              defaultValue={user?.profile.bio}
              id="bio"
              placeholder="Write about yourself..."
              required
              rows={4}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
