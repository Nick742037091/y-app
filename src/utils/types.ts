export type NonNullableProp<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: NonNullable<T[K]>
}
