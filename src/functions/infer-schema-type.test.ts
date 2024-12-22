import { describe, test } from '@jest/globals';
import { SchemaDefinition } from 'dynamoose/dist/Schema';
import { InferSchemaType } from '../functions/infer-schema-type';

describe('hello', () => {
  test('Should increment a number', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const todoSchemaDefinition: SchemaDefinition = {
      id: {
        type: String,
        hashKey: true, // Partition key
        required: true,
      },
      title: { type: String, required: true },
      description: String,
      completed: { type: Boolean },
    };

    // const todoSchema = new dynamoose.Schema(todoSchemaDefinition, {
    //   timestamps: {
    //     createdAt: {
    //       created_at: {
    //         type: {
    //           value: Date,
    //           settings: {
    //             storage: 'iso',
    //           },
    //         },
    //       },
    //     },
    //     updatedAt: {
    //       updated: {
    //         type: {
    //           value: Date,
    //           settings: {
    //             storage: 'seconds',
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    // Infer the TypeScript type from the Dynamoose schema definition
    type TodoType = InferSchemaType<typeof todoSchemaDefinition>;

    // Example usage
    const exampleTodo: TodoType = {
      id: '123',
      title: 'Example Todo',
      description: 'This is an example',
      completed: false,
    };

    // Create a model for the todos table
    // const Todo = dynamoose.model<TodoType & Item>('todos', todoSchema);

    // async function getAllTodos(): Promise<string> {
    //   // Fetch all todos from the DynamoDB table
    //   const todos = await Todo.scan().exec();
    //   return todos[0].title;
    // }
    // getAllTodos();
    expect(exampleTodo.description).toBe('This is an example');
  });
});
