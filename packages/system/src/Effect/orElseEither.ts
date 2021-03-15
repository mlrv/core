// tracing: off

import * as E from "../Either"
import { pipe } from "../Function"
import { succeed, tryOrElse_ } from "./core"
import type { Effect } from "./effect"
import { map_ } from "./map"

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @dataFirst orElseEither_
 */
export function orElseEither<R2, E2, A2>(
  that: () => Effect<R2, E2, A2>,
  __trace?: string
) {
  return <R, E, A>(self: Effect<R, E, A>) => orElseEither_(self, that, __trace)
}

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 */
export function orElseEither_<R, E, A, R2, E2, A2>(
  self: Effect<R, E, A>,
  that: () => Effect<R2, E2, A2>,
  __trace?: string
): Effect<R & R2, E2, E.Either<A, A2>> {
  return tryOrElse_(
    self,
    () => map_(that(), E.right),
    (x) => pipe(x, E.left, succeed),
    __trace
  )
}
