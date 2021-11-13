import React from 'react'
import { useVersionQuery } from '../../generated/graphql'


export function Version(props: {}) {
  const {data} = useVersionQuery()
  
  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="text-4xl m-4">Version</div>
      <div className="text-xl m-4">{data?.version}</div>
    </div>
  )
}