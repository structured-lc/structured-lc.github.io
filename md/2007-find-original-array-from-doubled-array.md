### Leetcode 2007 (Medium): Find Original Array From Doubled Array [Practice](https://leetcode.com/problems/find-original-array-from-doubled-array)

### Description  
Given an array `changed` that was created by taking an unknown array `original`, appending 2× each of its elements to itself, and then shuffling the result, reconstruct and return the original array. If no such `original` can exist, return an empty array.  
The order of elements in `original` does not matter.

### Examples  

**Example 1:**  
Input: `changed = [1,3,4,2,6,8]`  
Output: `[1,3,4]`  
*Explanation: The array [1,3,4] was doubled to get [1,3,4,2,6,8] (as 1×2=2, 3×2=6, 4×2=8), which matches `changed` after shuffling.*

**Example 2:**  
Input: `changed = [6,3,0,1]`  
Output: `[]`  
*Explanation: No possible `original` exists such that doubling every element and shuffling gives [6,3,0,1]. For instance, there's a 3 but no corresponding 6, or a 6 but no 12, and so on.*

**Example 3:**  
Input: `changed = [1]`  
Output: `[]`  
*Explanation: The length of changed is odd, so it cannot be formed by doubling another array and merging.*

### Thought Process (as if you’re the interviewee)  
First, let's clarify the requirements:  
- If `changed` is a "doubled array", there must be two times as many elements as in the original.
- For every value `x` in the original, both `x` and `2×x` must exist in `changed` (in any order).

**Brute-force idea:**  
Check all combinations to see if we can pick half the numbers whose doubles exist in the rest of the array.  
This is too slow (factorial time).

**Optimized approach:**  
- If the length of `changed` is odd, return [] immediately (since original cannot be split evenly).
- Count the occurrences of each element using a frequency map.
- Sort the elements (crucially, from smallest to largest—especially needed for handling zeroes and negatives).
- For each element x (in sorted order):
    - If there are more x's than 2×x's, it's not possible.
    - Take all available x's, reduce the count of 2×x for each x used, and build the result.
    - For zeroes, make sure their count is even, because they pair with themselves (0×2=0).
- If at any step, a required pair can't be found, return [].  
This greedy approach avoids pairing conflicts.

### Corner cases to consider  
- Empty array (should return [])
- Odd-length array (should return [])
- Arrays consisting only of zeroes (must have even count of zeroes)
- Numbers where the double appears before the original due to sorting order
- Multiple occurrences of the same number
- Very large numbers and zeros

### Solution

```python
def findOriginalArray(changed):
    # The original array must be exactly half the length of changed
    n = len(changed)
    if n % 2 != 0:
        return []

    # Count all elements
    count = {}
    for x in changed:
        count[x] = count.get(x, 0) + 1

    # Process in sorted order (crucial for correct pairing, especially for 0 and negatives)
    changed.sort()
    original = []

    for x in changed:
        if count[x] == 0:
            continue    # Already used up
        double = x * 2
        # For zeros, need to pair zero with zero
        if count.get(double, 0) == 0:
            return []
        # Use this x, reduce its count, and reduce its double's count
        count[x] -= 1
        count[double] -= 1
        original.append(x)

    return original
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the length of changed. Sorting takes O(n log n), and iterating/pairing takes O(n).
- **Space Complexity:** O(n) for the frequency map and output array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if numbers can be negative as well?  
  *Hint: Will sorting/symmetry of doubles/negatives change the approach?*

- What if you could not use any extra space?  
  *Hint: Can you do in-place pairing, or is it impossible?*

- How would you modify your solution if instead of 2× you had to form a “tripled” array, i.e., every x comes with 3×x?  
  *Hint: How does the requirement for pairing change? Do zeros and multiples create edge cases?*


### Summary
This problem is a great example of the "hash map counting" or "greedy map pairing" pattern commonly seen in array reconstruction and frequency validation questions.  
Sorting before pairing is a key insight to avoid premature matches. The same approach appears in problems involving pairs, doubles, or triplets in sorted or frequency-based arrays.


### Flashcard
Reconstruct the original array from a doubled array by ensuring each number and its double are present. If the doubled array's length is odd, return an empty array.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Array of Doubled Pairs(array-of-doubled-pairs) (Medium)
- Recover the Original Array(recover-the-original-array) (Hard)