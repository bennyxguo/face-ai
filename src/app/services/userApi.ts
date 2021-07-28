import { faceaiApi } from './faceaiApi';

export interface AutToken {
  success: boolean;
  userId: number;
  token: string;
}

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
    getUser: build.query<User, void>({
      query: () => `/user`
    }),
    registerUser: build.mutation<AutToken, { name: string; email: string; password: string }>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body
      })
    }),
    signinUser: build.mutation<AutToken, { email: string; password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
    }),
    storeUser: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/user`,
        method: 'PUT',
        body
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Updating the cached user data
        // Save one user info API fetch
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUser', void 0, (draft) => {
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
