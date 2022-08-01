const { AuthenticationError } = require('apollo-server-express');
const { User, Story } = require('../models');
const { signToken } = require('../utils/auth');

const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');



const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('stories');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('stories');
    },
    stories: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Story.find(params).sort({ createdAt: -1 });
    },
    story: async (parent, { storyId }) => {
      return Story.findOne({ _id: storyId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('stories');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Upload: GraphQLUpload,

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addStory: async (parent, { storyText }, context) => {
      if (context.user) {
        const story = await Story.create({
          storyText,
          storyAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { stories: story._id } }
        );

        return story;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // addFile: async (parent, { file }) => {
    //   const { createReadStream, filename, mimetype, encoding } = await file;

    //   // Invoking the `createReadStream` will return a Readable Stream.
    //   // See https://nodejs.org/api/stream.html#stream_readable_streams
    //   const stream = createReadStream();

    //   const out = require('fs').createWriteStream(filename);
    //   stream.pipe(out);
    //   await finished(out);

    //   return { filename, mimetype, encoding };
    // },

    addComment: async (parent, { storyId, commentText }, context) => {
      if (context.user) {
        return Story.findOneAndUpdate(
          { _id: storyId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeStory: async (parent, { storyId }, context) => {
      if (context.user) {
        const story = await Story.findOneAndDelete({
          _id: storyId,
          storyAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { stories: story._id } }
        );

        return story;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { storyId, commentId }, context) => {
      if (context.user) {
        return Story.findOneAndUpdate(
          { _id: storyId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
