export const tokenData = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NzE0MTQzLCJleHAiOjE2Mjc4ODY5NDN9.9xRiCOKVKngG-nVD2mqoyjemE8yl6Se0tki8Z39lPEE',
  type: 'Bearer'
};

export const userData = {
  age: '',
  avatar: 'https://gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=100&d=robohash&r=x',
  createdAt: '2021-07-26T13:08:44.000Z',
  email: 'test@test.com',
  entries: 2,
  hobby: '',
  id: 1,
  name: 'Test_User',
  updatedAt: '2021-07-28T04:06:20.000Z'
};

export const faceData = {
  outputs: [
    {
      id: '07e9fb3cc5fa49acab15e6ae0131f738',
      status: {
        stack_trace: [],
        code: 10000,
        description: 'Ok',
        details: '',
        percent_completed: 0,
        time_remaining: 0,
        req_id: '',
        internal_details: ''
      },
      created_at: { seconds: '1627868487', nanos: 666563569 },
      model: {
        id: 'f76196b43bbd45c99b4f3cd8e8b40a8a',
        name: 'Face',
        created_at: { seconds: '1606323024', nanos: 453038000 },
        app_id: 'main',
        output_info: {
          data: null,
          output_config: {
            select_concepts: [],
            concepts_mutually_exclusive: false,
            closed_environment: false,
            existing_model_id: '',
            language: '',
            hyper_parameters: '',
            max_concepts: 0,
            min_value: 0,
            training_timeout: 0,
            sample_ms: 0,
            hyper_params: null,
            embed_model_version_id: '',
            fail_on_missing_positive_examples: false,
            model_metadata: null
          },
          message: 'Show output_info with: GET /models/{model_id}/output_info',
          type: 'detect-concept',
          type_ext: 'detect-concept',
          fields_map: {
            fields: {
              'regions[...].data.concepts[...].id': {
                stringValue: 'predicted_det_labels',
                kind: 'stringValue'
              },
              'regions[...].region_info.bounding_box': {
                stringValue: 'predicted_det_bboxes',
                kind: 'stringValue'
              },
              'regions[...].data.concepts[...].value': {
                stringValue: 'predicted_det_scores',
                kind: 'stringValue'
              }
            }
          },
          params: {
            fields: { detection_threshold: { numberValue: 0.9, kind: 'numberValue' } }
          }
        },
        model_version: {
          id: '45fb9a671625463fa646c3523a3087d5',
          created_at: { seconds: '1614879626', nanos: 81729000 },
          status: {
            stack_trace: [],
            code: 21100,
            description: 'Model is trained and ready',
            details: '',
            percent_completed: 0,
            time_remaining: 0,
            req_id: '',
            internal_details: ''
          },
          active_concept_count: 0,
          metrics: null,
          total_input_count: 0,
          completed_at: null,
          description: '',
          visibility: { gettable: 50 },
          app_id: 'main',
          user_id: 'clarifai'
        },
        display_name: '',
        user_id: 'clarifai',
        input_info: {
          fields_map: { fields: { image: { stringValue: 'images', kind: 'stringValue' } } },
          params: null
        },
        train_info: { params: null },
        model_type_id: 'visual-detector',
        visibility: { gettable: 50 },
        description: ''
      },
      input: {
        id: 'df03f5ead70749cb8df9c1bcee5a6c02',
        data: {
          concepts: [],
          colors: [],
          clusters: [],
          embeddings: [],
          regions: [],
          frames: [],
          tracks: [],
          image: {
            url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2272&q=80',
            base64: { type: 'Buffer', data: [] },
            allow_duplicate_url: false,
            hosted: null
          },
          video: null,
          metadata: null,
          geo: null,
          text: null,
          audio: null
        },
        created_at: null,
        modified_at: null,
        status: null
      },
      data: {
        concepts: [],
        colors: [],
        clusters: [],
        embeddings: [],
        regions: [
          {
            id: '1b3b8ced8f62d5306253dcfcf3d040f4',
            region_info: {
              bounding_box: {
                top_row: 0.14610901474952698,
                left_col: 0.4066224694252014,
                bottom_row: 0.6520825624465942,
                right_col: 0.6247719526290894
              },
              mask: null,
              polygon: null,
              point: null
            },
            data: {
              concepts: [
                {
                  id: 'ai_b1b1b1b1',
                  name: 'BINARY_POSITIVE',
                  value: 0.9999985694885254,
                  created_at: null,
                  language: '',
                  app_id: 'main',
                  definition: '',
                  vocab_id: '',
                  visibility: null,
                  user_id: ''
                }
              ],
              colors: [],
              clusters: [],
              embeddings: [],
              regions: [],
              frames: [],
              tracks: [],
              image: null,
              video: null,
              metadata: null,
              geo: null,
              text: null,
              audio: null
            },
            value: 0.9999985694885254,
            track_id: ''
          }
        ],
        frames: [],
        tracks: [],
        image: null,
        video: null,
        metadata: null,
        geo: null,
        text: null,
        audio: null
      }
    }
  ],
  status: {
    stack_trace: [],
    code: 10000,
    description: 'Ok',
    details: '',
    percent_completed: 0,
    time_remaining: 0,
    req_id: 'd8265685f16c48b7a1716b837359df1d',
    internal_details: ''
  }
};
