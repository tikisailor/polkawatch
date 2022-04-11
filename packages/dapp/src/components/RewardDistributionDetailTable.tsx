import * as React from 'react';

import { Expose } from "class-transformer";
import DetailTable from "./DetailTable";

/**
 * This class is capable of mapping any Reward Distribution table row.
 * The Table will ignore missing columns, thus this is an Union of all possible
 * fields in the right order.
 */
class AnyDistributionRow  {

  @Expose()
  public Region: string

  @Expose()
  public Country: string

  @Expose({
    name: 'NetworkProvider'
  })
  public Network: string

  @Expose({
    name: 'ValidationGroup'
  })
  public Operator: string

  @Expose()
  public Validator: string

  @Expose()
  public Regions: Number

  @Expose({
    name: 'LastRegion'
  })
  public "Last Region": string

  @Expose()
  public Countries: Number

  @Expose({
    name: 'LastCountry'
  })
  public "Last Country": string

  @Expose()
  public Networks: Number
  @Expose({
    name: 'LastNetwork'
  })
  public "Last Network": string


  @Expose({
    name: 'ValidatorGroups'
  })
  public Operators: Number

  @Expose()
  public Validators: Number

  @Expose()
  public Nominators: Number


  @Expose({
    name: 'DotMedianNomination'
  })
  public "Median Nomination": Number

  @Expose({
    name: 'DotRewards'
  })
  public Rewards: Number
}

export function RewardDistributionDetailTable(
  {
    title="Reward Distribution",
    tableData,
    minTableWidth=880,
    rowsPerPageOptions=[10,25,50],
    rowUri=null
  }){
  return (
    <DetailTable
      RowClass={AnyDistributionRow}
      title={title}
      tableData={tableData}
      minTableWidth={minTableWidth}
      rowsPerPageOptions={rowsPerPageOptions}
      rowUri={rowUri}
    /> )
}

