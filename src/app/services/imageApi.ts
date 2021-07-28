import { faceaiApi } from './faceaiApi';
import { userApi } from './userApi';

export interface ClarifaiData {
  outputs: {
    data: {
      regions: {
        region_info: {
          bouding_box: {
            bottom_row: number;
            left_col: number;
            right_col: number;
            top_row: number;
          };
        };
      }[];
    };
  }[];
}

export const imageApi = faceaiApi.injectEndpoints({
  endpoints: (build) => ({
    updateEntry: build.mutation<number, { current: number }>({
      query: (body) => ({
        url: '/image/updateEntry',
        method: 'PUT',
        body
      }),
      async onQueryStarted({ current }, { dispatch, queryFulfilled }) {
        // Updating the cached user entries
        // Save one user info API fetch
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUser', void 0, (draft) => {
            Object.assign(draft, { entries: current + 1 });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    faceRecognition: build.mutation<ClarifaiData, { imageUrl: string }>({
      query: (body) => ({
        url: '/image/faceRecognition',
        method: 'POST',
        body
      })
    })
  }),
  overrideExisting: false
});

export const { endpoints, useUpdateEntryMutation, useFaceRecognitionMutation } = imageApi;
