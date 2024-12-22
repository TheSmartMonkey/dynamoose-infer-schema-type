import dynamoose from 'dynamoose';
import { InferSchemaType } from 'dynamoose-infer-schema-type';
import { Item } from 'dynamoose/dist/Item';
import { SchemaDefinition } from 'dynamoose/dist/Schema';

// Example Dynamoose schema
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

const todoSchema = new dynamoose.Schema(todoSchemaDefinition, {
  timestamps: {
    createdAt: {
      created_at: {
        type: {
          value: Date,
          settings: {
            storage: 'iso',
          },
        },
      },
    },
    updatedAt: {
      updated: {
        type: {
          value: Date,
          settings: {
            storage: 'seconds',
          },
        },
      },
    },
  },
});

// Infer the TypeScript type from the Dynamoose schema definition
type Todo = InferSchemaType<typeof todoSchemaDefinition>;

// Example usage
const exampleTodo: Todo = {
  id: '123',
  title: 'Example Todo',
  description: 'This is an example',
  completed: false,
};

// Create a model for the todos table
const TodoModel = dynamoose.model<Todo & Item>('todos', todoSchema);

// async function getAllTodos(): Promise<string> {
//   // Fetch all todos from the DynamoDB table
//   const todos = await Todo.scan().exec();
//   return todos[0].title;
// }

if (require.main === module) {
  console.log(exampleTodo.description);
  console.log(TodoModel.Item);

  // getAllTodos();
}
