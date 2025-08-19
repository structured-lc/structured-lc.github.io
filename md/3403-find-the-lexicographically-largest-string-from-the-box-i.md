### Leetcode 3403 (Medium): Find the Lexicographically Largest String From the Box I [Practice](https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i)

### Description  
Given a string word and an integer numFriends, the string is split into numFriends non-empty consecutive substrings in every possible way (all unique splits). All split substrings from all rounds are put into a box.  
Your task is to return the lexicographically largest string that can possibly be in the box (i.e., the alphabetically greatest substring obtainable by any such split).  
- Each split must divide the word into exactly numFriends non-empty pieces, so for numFriends=2 and word="ABCD", the splits are ["A","BCD"], ["AB","CD"], ["ABC","D"].  
- Every possible distinct split is considered, and every substring arising as a split part is put in the box.
- Find the substring (from any split, any position) that is the lexicographically largest.

### Examples  

**Example 1:**  
Input: `word = "dbca"`, `numFriends = 2`  
Output: `"dbc"`  
*Explanation:*
- Possible splits: ["d","bca"], ["db","ca"], ["dbc","a"]
- Substrings: "d","bca","db","ca","dbc","a"
- Largest substring is "dbc"

**Example 2:**  
Input: `word = "abcd"`, `numFriends = 3`  
Output: `"cd"`  
*Explanation:*
- Possible splits: ["a","b","cd"], ["a","bc","d"], ["ab","c","d"]
- Substrings: "a","b","cd","a","bc","d","ab","c","d"
- Largest substring is "cd"

**Example 3:**  
Input: `word = "abc"`, `numFriends = 1`  
Output: `"abc"`  
*Explanation:*
- Only split is the whole word, so largest substring is "abc"

### Thought Process (as if you’re the interviewee)  
- Brute force:  
  - Generate every possible split with numFriends parts, gather all substrings in those splits, and pick the lex greatest.  
  - For word length n, there are C(n-1, numFriends-1) ways to split, and in each, numFriends substrings are generated.  
  - Too slow if n is large (combinatorial explosion).

- Key insight:  
  - In any split, each piece is a non-empty substring.
  - The *largest possible substring* among all possible splits will be of maximum length n-numFriends+1 (since when you take the first piece as long as possible, the rest get 1 character).
  - So, look at all substrings of length from 1 up to n-numFriends+1, and pick the lex greatest among them — all such substrings can appear as some split part.

- Final approach:
  - Compute the maximal substring of length n-numFriends+1 (from any index), as this is the longest possible substring we'll see in any split part.
  - But substrings of lesser length can also be candidates, so check for the lexicographically largest among all possible valid substrings (of lengths 1 to n-numFriends+1).

- Tradeoffs:
  - Iterating all substrings up to length n-numFriends+1 is acceptable for interview (since numFriends is at least 1, n ≤ 1000 generally in such questions).
  - O(n²) worst case, but can be made O(n) with some clever algorithms (suffix array), which is likely overkill for this variant.

### Corner cases to consider  
- numFriends = 1 (whole string is the only substring)
- numFriends = length of word (each char is its own split; answer is max(char) in word)
- numFriends > length of word (invalid, should not happen)
- All characters in word equal ("aaa", largest substring is "aaa" if numFriends=1, "aa" for numFriends=2, etc.)
- Very short word ("a", "ab", etc.)
- Single split gives multiple maximal substrings (ensure you check all)

### Solution

```python
def lex_largest_string(word: str, numFriends: int) -> str:
    n = len(word)
    max_len = n - numFriends + 1  # The longest possible split part
    answer = ""

    # Check all substrings of allowed lengths (1 up to max_len)
    for l in range(1, max_len + 1):
        for i in range(n - l + 1):
            candidate = word[i:i + l]
            if candidate > answer:
                answer = candidate

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - For each possible length l (1 to n-numFriends+1), we check all substrings of that length, i.e. up to n²/2 substrings in total. Each substring comparison is O(l), but since lengths are O(n) at most, overall is O(n²).
- **Space Complexity:** O(1) extra (beyond the input and answer string)  
  - Only a few variables are used for comparison/candidate. No extra storage scaling with input.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the solution for very large N?  
  *Hint: Think about suffix arrays or optimized substring search, can you improve to O(n)?*

- What if you need to return all lexicographically largest substrings (if tied)?  
  *Hint: Track all candidates equal to current max, and output the set.*

- How does your approach change if splits can be non-contiguous pieces?  
  *Hint: This changes the rules to subsequence, not substring — which completely alters the problem.*

### Summary
This problem utilizes **substring enumeration and comparison**, a common string pattern in coding interviews. The key is realizing the maximal substring length possible from the split rules, and then checking all eligible substrings to find the lexicographic maximum.  
This **pattern** is broadly applicable in problems that need **optimal substring selection under constraints**, such as sliding windows, maximal/minimal substring problems, and sometimes in suffix-array or trie-based optimizations.

### Tags
Two Pointers(#two-pointers), String(#string), Enumeration(#enumeration)

### Similar Problems
- Last Substring in Lexicographical Order(last-substring-in-lexicographical-order) (Hard)
- Construct the Lexicographically Largest Valid Sequence(construct-the-lexicographically-largest-valid-sequence) (Medium)