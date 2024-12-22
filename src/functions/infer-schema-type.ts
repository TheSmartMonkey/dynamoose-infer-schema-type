export type InferSchemaType<S> = {
  [K in keyof S]: S[K] extends { type: StringConstructor }
    ? string
    : S[K] extends StringConstructor
      ? string
      : S[K] extends { type: BooleanConstructor }
        ? boolean
        : S[K] extends BooleanConstructor
          ? boolean
          : S[K] extends { type: NumberConstructor }
            ? number
            : S[K] extends NumberConstructor
              ? number
              : S[K] extends { type: ArrayConstructor }
                ? Array<InferSchemaType<S[K]['type']>>
                : S[K] extends ArrayConstructor
                  ? any[]
                  : S[K] extends { type: ObjectConstructor }
                    ? { [key: string]: InferSchemaType<S[K]['type']> }
                    : S[K] extends ObjectConstructor
                      ? object
                      : any;
};
