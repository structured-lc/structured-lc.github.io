### Leetcode 49 (Medium): Group Anagrams [Practice](https://leetcode.com/problems/group-anagrams)

### Description  
Given an array of strings, group the strings that are anagrams of each other together. An anagram is a word formed by rearranging the letters of another word using all original letters exactly once. For example, "eat" and "tea" are anagrams. The output should be a list of lists, with each inner list containing all strings that are anagrams of each other. The order of groups and elements within each group does not matter.

### Examples  

**Example 1:**  
Input: `["eat","tea","tan","ate","nat","bat"]`  
Output: `[["eat","tea","ate"],["tan","nat"],["bat"]]`  
*Explanation: "eat", "tea", and "ate" are all anagrams and grouped together; "tan" and "nat" are also anagrams; "bat" has no anagrams in the list.*

**Example 2:**  
Input: `[""]`  
Output: `[[""]]`  
*Explanation: The only string is an empty string. It forms its own group.*

**Example 3:**  
Input: `["a"]`  
Output: `[["a"]]`  
*Explanation: Only one string, so it's a group by itself.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Check every pair of strings to see if they’re anagrams by sorting or counting characters. Time: O(n² × k log k), with n = #strings and k = length of each string.
  - This is very inefficient for large input sizes.

- **Optimized approach:**  
  - Key insight: *If two strings are anagrams, their characters when sorted will form the same string.*  
  - Solution: For each string, sort its letters and use the sorted string as a key in a dictionary (hash map), with the value being a list to collect all words with that same sorted "signature" [3].
  - Algorithm:
    - For each word, compute its sorted characters (e.g., “eat” → “aet”).
    - Add the word to the list for key “aet”.
    - At the end, return all the grouped lists.

- **Trade-offs:**  
  - Sorting is O(k log k) per string, acceptable since k is typically small.
  - Can also represent the key using a letter count tuple of size 26, which can be slightly faster for longer strings, but sorting is simpler and easy to code [1][3][4].

### Corner cases to consider  
- Empty string in input.
- Only one input string.
- Duplicated words (e.g., `["eat","eat"]`).
- Strings containing spaces or non-ASCII letters.
- All strings unique (no anagrams).
- All strings are anagrams (large group).

### Solution

```python
def groupAnagrams(strs):
    # Use a dictionary to map sorted word signature to list of words
    anagrams = {}  # key: sorted string, value: list of original strings
    
    for word in strs:
        # Sort the word to get the "anagram signature"
        key = ''.join(sorted(word))
        # Add the word into its group in dictionary
        if key not in anagrams:
            anagrams[key] = []
        anagrams[key].append(word)
    
    # Return the grouped anagrams as a list of lists
    return list(anagrams.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k log k), where n = number of words, k = average length of a word. Sorting each word is O(k log k), and we do it for every word.
- **Space Complexity:** O(n × k), for storing all words in the hash map and the output list. Storing keys (sorted strings) also takes up O(n × k) in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if all input strings are extraordinarily long (k very large)?
  *Hint: Think about an O(k) signature using frequency counts instead of sorting.*

- What if the alphabet is not just lowercase English letters?
  *Hint: Consider using a tuple of full unicode code point counts or a different key signature.*

- How would you modify your solution to return the groups in a particular order?  
  *Hint: Can you sort the input or the result at the end?*

### Summary
This is a classic “hashing + grouping” problem and is a direct application of the **Hash Map** and **Sorting** patterns. The key idea is to use a canonical signature (either sorted characters or character counts) as keys in a dictionary to collect each group. This approach generalizes to many grouping problems where we need to classify objects by some invariant property.


### Flashcard
Sort each string and group by sorted key in a hash map; anagrams share the same sorted representation.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
- Valid Anagram(valid-anagram) (Easy)
- Group Shifted Strings(group-shifted-strings) (Medium)
- Find Resultant Array After Removing Anagrams(find-resultant-array-after-removing-anagrams) (Easy)
- Count Anagrams(count-anagrams) (Hard)