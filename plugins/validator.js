'use strict';

const parser = require('screwdriver-config-parser');
const schema = require('screwdriver-data-schema');
const validatorSchema = schema.api.validator;
const boom = require('boom');

/**
 * Hapi Validator Plugin
 *  - Validates screwdriver.yaml and returns the expected execution steps
 * @method register
 * @param  {Hapi.Server}    server
 * @param  {Object}         options
 * @param  {Function} next
 */
exports.register = (server, options, next) => {
    server.route({
        method: 'POST',
        path: '/validator',
        config: {
            description: 'Validate a given screwdriver.yaml',
            notes: 'Returns the parsed config or validation errors',
            tags: ['api', 'validation', 'yaml'],
            handler: (request, reply) => {
                parser(request.payload.yaml, (err, pipeline) => {
                    if (err) {
                        return reply(boom.badRequest(err.message));
                    }

                    return reply(pipeline);
                });
            },
            validate: {
                payload: validatorSchema.input
            },
            response: {
                schema: validatorSchema.output
            }
        }
    });
    next();
};

exports.register.attributes = {
    name: 'validator'
};