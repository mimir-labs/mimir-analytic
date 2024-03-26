// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function camelToSnake(text: string) {
  return text.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase());
}

export function snakeToCamel(text: string) {
  return text.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}
