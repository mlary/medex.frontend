export function EnumToArray<T>(data: T, valuePrepare?: (value: any) => any): Array<{ key: string; value: any }> {
  return Object.keys(data).map((key) => ({
    key,
    value: valuePrepare ? valuePrepare((data as any)[key]) : (data as any)[key],
  }));
}
