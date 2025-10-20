### Leetcode 1512 (Easy): Number of Good Pairs [Practice](https://leetcode.com/problems/number-of-good-pairs)

### Description  
Given an array of integers nums, count how many pairs (i, j) exist such that nums[i] == nums[j] and i < j (i.e., nums[i] and nums[j] are equal and the first index is before the second). Return the number of such 'good pairs.'

### Examples  
**Example 1:**  
Input: `nums = [1,2,3,1,1,3]`  
Output: `4`  
*Explanation: The pairs are (0,3), (0,4), (3,4), and (2,5).*  

**Example 2:**  
Input: `nums = [1,1,1,1]`  
Output: `6`  
*Explanation: The pairs are (0,1), (0,2), (0,3), (1,2), (1,3), (2,3).*  

**Example 3:**  
Input: `nums = [1,2,3]`  
Output: `0`  
*Explanation: No pairs satisfy nums[i] == nums[j].*

### Thought Process (as if you’re the interviewee)  
First, think brute force: For all pairs (i, j) with 0 ≤ i < j < n, check if nums[i] == nums[j]. That's O(n²), slow for large n. Can we do better? Yes: Use a hashmap to count occurrences. For each number, when you see it again at position j, all previous positions where it appeared are valid i—so you can count how many times you've seen it so far. For each occurrence, add current count to answer, then increment count. This brings us to O(n) time using a dictionary.

### Corner cases to consider  
- No good pairs (all elements unique)
- All elements the same (maximum # of pairs)
- nums has only one element
- nums is empty

### Solution

```python
from collections import defaultdict

def numIdenticalPairs(nums):
    freq = defaultdict(int)
    good_pairs = 0
    for n in nums:
        # For each n, we can make 'freq[n]' pairs with prior appearances
        good_pairs += freq[n]
        freq[n] += 1
    return good_pairs
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n = len(nums). Each element processed once.
- **Space Complexity:** O(u), where u = number of unique elements (dict size).

### Potential follow-up questions (as if you’re the interviewer)  
- What if you want pairs where i > j?
  *Hint: The approach is symmetric, just be careful with indices.*

- How could you print all the actual pairs?
  *Hint: Store indices for each value, not just counts.*

- If nums is very large, can you process it as a stream?
  *Hint: Yes, as the solution only needs frequency up to current element.*

### Summary
This problem is a textbook use of hashmaps to count, enabling one-pass O(n) processing instead of nested loops. This counting pairs trick appears in Two Sum, anagrams, and various counting problems.


### Flashcard
Count good pairs in an array by using a hashmap to efficiently count occurrences of each number.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting)

### Similar Problems
- Number of Pairs of Interchangeable Rectangles(number-of-pairs-of-interchangeable-rectangles) (Medium)
- Substrings That Begin and End With the Same Letter(substrings-that-begin-and-end-with-the-same-letter) (Medium)