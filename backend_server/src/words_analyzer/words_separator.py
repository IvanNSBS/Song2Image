import os
from typing import List
from nltk.corpus import wordnet

def _valid_word(word: str):
    try:
        var = wordnet.synsets(word)[0]
        return True
    except Exception as e:
        return False

def _remove_invalid_characters_from_word(word: str):
    return word.replace("?", "").replace("\n", " ")

def _remove_words_that_arent_on_wordnet(words: List[str]):
    valid_words = [ word for word in words if _valid_word(word) ]
    invalid_words = [ word for word in words if not _valid_word(word) ]

    print(f"Removed words that were not on wordnet: {invalid_words}")
    return valid_words, invalid_words

def musixmatch_snippet_to_array(phrase: str) -> List[str]:
    """
    Converts the musixmatch snippet to an array of strings
    with all the snippet words that are available in wordnet
    """
    split = phrase.split(" ")
    output = [ _remove_invalid_characters_from_word(word) for word in split ]

    output, _ = _remove_words_that_arent_on_wordnet(output)
    return output

def lyrics_to_strophes(lyrics: str) -> List[str]:
    """
    Separates a song lyrics to strophes 
    """
    output = lyrics.split("""\n\n""")
    return output

def verse_to_word_array(verse: str) -> List[str]:
    """
    Converts a song verse to an array of words that are available on wordnet
    """
    only_valid_characters = _remove_invalid_characters_from_word(verse)
    unique_words = list(dict.fromkeys(only_valid_characters.split(" ")))

    output, _ = _remove_words_that_arent_on_wordnet(unique_words)
    return output
