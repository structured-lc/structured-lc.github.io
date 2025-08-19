### Leetcode 2559 (Medium): Count Vowel Strings in Ranges [Practice](https://leetcode.com/problems/count-vowel-strings-in-ranges)

### Description  
Given a list of strings `words` and a list of queries, where each query is a pair of indices `[l, r]`, you need to determine, for each query, **how many strings in the subarray `words[l]` to `words[r]` (inclusive) both start and end with a vowel**. Vowels are specifically `'a'`, `'e'`, `'i'`, `'o'`, `'u'`.  
Each query should return a count, and results should be returned as a list of integers—one for each query.

### Examples  

**Example 1:**  
Input:  
`words = ["aba", "bcb", "ece", "aa", "e"]`  
`queries = [[0,2],[1,4],[1,1]]`  
Output:  
`[2, 3, 0]`  
Explanation:  
For query [0,2]: `["aba", "bcb", "ece"]` → "aba" and "ece" are vowel strings ⇒ 2  
For query [1,4]: `["bcb", "ece", "aa", "e"]` → "ece", "aa", "e" ⇒ 3  
For query [1,1]: `["bcb"]` is not a vowel string ⇒ 0

**Example 2:**  
Input:  
`words = ["ae", "b", "i", "oeu", "abc", "uoau"]`  
`queries = [[0,5],[2,2],[3,4]]`  
Output:  
`[3, 1, 1]`  
Explanation:  
For [0,5]: `["ae","b","i","oeu","abc","uoau"]` → "ae","i","uoau" ⇒ 3  
For [2,2]: `["i"]` ⇒ "i" is a vowel string ⇒ 1  
For [3,4]: `["oeu","abc"]` ⇒ "oeu" ⇒ 1

**Example 3:**  
Input:  
`words = ["b", "c", "d"]`  
`queries = [[0,2],[1,1]]`  
Output:  
`[0, 0]`  
Explanation:  
No words start and end with vowel.

### Thought Process (as if you’re the interviewee)  
Let's begin with the **brute-force approach**: For each query, loop over the corresponding subarray, check for each string if the first and last character are both vowels, and count up. This costs O(q \* k), where k is the length of each subarray—a potential O(nq) in the worst case, which could be slow.

We can **optimize** using a **prefix sum** idea:
- First, precompute a prefix sum array where each entry at index i is the count of vowel strings up to index i in the words array.
- For each query `[l, r]`, the answer is simply `prefix[r+1] - prefix[l]`, allowing O(1) per query.
- This reduces overall time to O(n + q), where n=len(words), q=number of queries, and is both fast and simple.

The trade-off is the extra space for the prefix sum (O(n)), which is acceptable for typical n (≤10⁵ in constraints).

### Corner cases to consider  
- Empty `words` array.
- Empty `queries` list.
- Queries where l > r (invalid: assume not present by constraints).
- Strings of single character (should check if that character is a vowel).
- Strings with non-lowercase or non-alphabetical characters (assume all lower-case, per problem).
- All strings are non-vowel strings, or all are vowel strings.
- Overlapping queries.

### Solution

```python
def count_vowel_strings_in_ranges(words, queries):
    # Set of vowels for quick lookup
    vowels = {'a', 'e', 'i', 'o', 'u'}
    
    # Helper function to check if a word is a vowel string
    def is_vowel_string(word):
        return word[0] in vowels and word[-1] in vowels
    
    n = len(words)
    # Prefix sum: prefix[i] = number of vowel strings in words[0:i]
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + (1 if is_vowel_string(words[i]) else 0)
    
    # For each query, use prefix sums to count quickly
    result = []
    for l, r in queries:
        count = prefix[r + 1] - prefix[l]
        result.append(count)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q)  
  - O(n) to build the prefix sum, O(q) to answer all queries.
- **Space Complexity:** O(n)  
  - For the prefix sum array of size n+1. No extra space per query; input and output sizes dominate memory use.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if vowels could be uppercase or lowercase?  
  *Hint: Preprocess words by converting first and last character to lowercase before checking.*

- What if queries were streaming in online (i.e., not given all at once)?  
  *Hint: Prefix sum still works, as long as no updates to `words`. If updates, need more advanced DS (e.g., segment tree).*

- How would you solve it without extra space?  
  *Hint: You'd need to process each query directly O(qk), which is less efficient.*

### Summary
This problem fits the **“subarray queries with static array”** pattern and is efficiently solved using a **prefix sum**. Precomputing prefix counts for each position lets every range query run in O(1), making this a common and scalable technique for interview questions about range counts, frequency tables, or subarray sums. This pattern is widely applicable to problems where you need to perform many lookups of cumulative or aggregated subarray data.

### Tags
Array(#array), String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
- Jump Game VII(jump-game-vii) (Medium)