import { faceaiApi } from './faceaiApi';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  age: string;
  hobby: string;
  entries: number;
  createdAt: string;
}

export const userApi = faceaiApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (id) => `/user/${id}`
    }),
    registerUser: build.mutation<User, { name: string; email: string; password: string }>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body
      })
    }),
    signinUser: build.mutation<User, { email: string; password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
    }),
    storeUser: build.mutation<User, Pick<User, 'id'> & Partial<User>>({
      query: (body) => ({
        url: `/user/${body.id}`,
        method: 'PUT',
        body
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Updating the cached user data
        // Save one user info API fetch
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUser', body.id, (draft) => {
            Object.assign(draft, body);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  }),
  overrideExisting: false
});

export const {
  endpoints,
  usePrefetch,
  useLazyGetUserQuery,
  useGetUserQuery,
  useRegisterUserMutation,
  useSigninUserMutation,
  useStoreUserMutation
} = userApi;
