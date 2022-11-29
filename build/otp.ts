
export interface Arguments {
  otp: string;
}

export function getArgsDict(args: string[]): Arguments {
  return args.splice(2).reduce((a: Arguments, i: string ) => {

    const [key, value] = i.split('=')

    return {
      ...a,
      [key]: value
    }

  }, <Arguments>{})
}
