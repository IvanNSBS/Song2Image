from typing import List
from nltk.corpus import wordnet
from words_analyzer.words_separator import musixmatch_snippet_to_array, verse_to_word_array


def calculate_similarity(word_1: str, word_2: str) -> float:
    """
    Calculates how similar word 1 is to word 2

    :input word_1(str): The word to be compared to word 2
    :input word_2(str): The word that will be compared
    """
    syn1 = None
    syn2 = None
    try:
        syn1 = wordnet.synsets(word_1)[0]
    except:
        print(f"ERROR: Couldn't extract info from <{word_1}>. The word probably isn't on Wordnet")
        return 0
    try:
        syn2 = wordnet.synsets(word_2)[0]
    except:
        print(f"ERROR: Couldn't extract info from <{word_2}>. The word probably isn't on Wordnet")
        return 0

    return syn1.wup_similarity(syn2)

def get_average_similarity(word: str, words: List[str]) -> float:
    """
    Calculates the average similarity of a word within a list of words to compare using Wu-Palmer Similarity
    :input word: The word to compare to the list
    :input words: The list of words that word needs to be compared to
    """
    length = len(words)
    total = 0

    for w in words:
        similarity = calculate_similarity(word, w)
        total = total + similarity

    return total / length

def get_most_similar_words(musixmatch_phrase:str, song_verse: str, max_words: int) -> List[str]:
    """
    Returns a list with the verse words that are most similar with the musix match phrase, limited
    to the max_words argument

    :input musixmatch_phrase(str): The song snippet that represents the entire song
    :input song_verse: A verse of the given song
    :input max_words(str): Limits how many worlds will be returned in the outpuit to this value
    """
    musixmatch_words = musixmatch_snippet_to_array(musixmatch_phrase)
    verse_words = verse_to_word_array(song_verse)
    output_length = max_words

    verse_words_and_similarity = []
    output = []

    index: int = 0
    used = set()
    for word in verse_words:
        if word in used:
            continue

        used.add(word)
        word = word.lower()
        avg_similarity_with_musixmatch = get_average_similarity(word, musixmatch_words)
        verse_words_and_similarity.append((word, index, avg_similarity_with_musixmatch))
        index = index + 1

    cp_verse_words_and_similarity = verse_words_and_similarity
    cp_verse_words_and_similarity.sort(key=lambda tp: tp[2], reverse=True)
    cp_verse_words_and_similarity = cp_verse_words_and_similarity[0:output_length]
    cp_verse_words_and_similarity.sort(key=lambda tp: tp[1], reverse=False)
    
    output = [word for word, index, similarity in cp_verse_words_and_similarity]
    return output
