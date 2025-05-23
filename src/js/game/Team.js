import Character from './Character.js';

/**
 * Класс для взаимодействия с командой.
 */
export default class Team {
  #membersSet;

  constructor() {
    this.#membersSet = new Set();
  }

  /**
   * Получает команду.
   * @returns {Set} - Команда персонажей.
   */
  get members() {
    return this.#membersSet;
  }

  /**
   * Добавляет персонажа в команду.
   * @param {Character} character - Объект класса Character.
   * @throws {Error} - Если персонаж уже есть в команде или не является экземпляром Character.
   */
  add(character) {
    this.#checkCharacterInstance(character);
    this.#verifyCharacterMembership(character);

    this.#membersSet.add(character);
  }

  /**
   * Добавляет всех указанных персонажей в команду.
   * @param {Character} characters - Произвольное количество персонажей.
   */
  addAll(...characters) {
    characters.forEach((character) => {
      if (character instanceof Character) {
        this.#membersSet.add(character);
      }
    });
  }

  /**
   * Преобразует команду в массив.
   * @returns {Array} - Массив персонажей.
   */
  toArray() {
    return [...this.#membersSet];
  }

  /**
   * Очищает команду.
   */
  clear() {
    this.#membersSet.clear();
  }

  /**
   * Удаляет персонажа из команды.
   * @param {Character} character - Объект класса Character.
   * @throws {Error} - Если персонаж не является экземпляром Character или не находится в команде.
   */
  remove(character) {
    this.#checkCharacterInstance(character);
    this.#verifyCharacterNotMember(character);

    this.#membersSet.delete(character);
  }

  /**
   * Генератор, который возвращает итератор для перебора членов команды.
   * 
   * Этот метод позволяет использовать коллекцию (Set) команды в конструкциях,
   * таких как `for...of`, а также в других контекстах, где ожидается
   * итерация. Он возвращает каждого члена команды по одному за раз.
   * 
   * @yields {Character} - Персонаж из команды.
   * 
   * @example
   * const team = new Team();
   * 
   * team.add(character1);
   * team.add(character2);
   * 
   * for (const character of team) {
   *   console.log(character);
   * }
   */
  *[Symbol.iterator]() {
    yield* this.#membersSet;
  }

  /**
   * Проверяет, что переданный персонаж является экземпляром Character.
   * @param {Character} character - Объект класса Character.
   * @throws {Error} - Если персонаж не является экземпляром Character.
   */
  #checkCharacterInstance(character) {
    if (!(character instanceof Character)) {
      throw new Error('Персонаж должен быть экземпляром класса Character');
    }
  }

  /**
   * Проверяет, что переданный персонаж есть в команде.
   * @param {Character} character - Объект класса Character.
   * @throws {Error} - Если персонажа нет в команде.
   */
  #verifyCharacterNotMember(character) {
    if (!this.#membersSet.has(character)) {
      throw new Error('Персонажа нет в команде');
    }
  }

  /**
   * Проверяет, что переданный персонаж есть в команде.
   * @param {Character} character - Объект класса Character.
   * @throws {Error} - Если персонаж уже есть в команде.
   */
  #verifyCharacterMembership(character) {
    if (this.#membersSet.has(character)) {
      throw new Error('Персонаж уже в команде');
    }
  }
}
