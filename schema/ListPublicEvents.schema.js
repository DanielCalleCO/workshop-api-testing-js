const listPublicEventsSchema = [{
    id: {
        type: 'number',
      },
    type: {
        type: 'string'
      },
    actor: {
      id: {
        type: 'number',
      },
      login: {
        type: 'string'
      },
      display_login: {
        type: 'string'
      },
      gravatar_id: {
        type: 'string'
      },
      url: {
        type: 'string'
      },
      avatar_url: {
        type: 'string'
      },
    },
    repo: {
      id: {
        type: 'number',
      },
      name: {
        type: 'string'
      },
      url: {
        type: 'string'
      },
    },
    payload: {
      push_id: {
        type: 'number',
      },
      size: {
        type: 'number',
      },
      distinct_size: {
        type: 'number',
      },
      ref: {
        type: 'string'
      },
      head: {
        type: 'string'
      },
      before: {
        type: 'string'
      },
      commits: {
        type: 'array'
      },
    },
    public: {
        type: 'boolean'
      },
    created_at: {
        type: 'string'
      },
    org: {
      id: {
        type: 'number'
      },
      login: {
        type: 'string'
      },
      gravatar_id: {
        type: 'string'
      },
      url: {
        type: 'string'
      },
      avatar_url: {
        type: 'string'
      },
    }
}];

exports.listPublicEventsSchema = listPublicEventsSchema;