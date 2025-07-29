### Leetcode 1539 (Easy): Kth Missing Positive Number [Practice](https://leetcode.com/problems/kth-missing-positive-number)

### Description  
Given a **sorted** array of distinct positive integers and a number k, find the kᵗʰ positive integer that is **missing** from this array.  
Imagine starting at 1 and counting upwards: whenever you hit a number not in the array, count it as a missing positive. Return the kᵗʰ such missing number.  
For example, if arr = [2,3,4,7,11], k = 5, we want the 5ᵗʰ missing number: counting up from 1, which values are skipped by the array, and what's the 5ᵗʰ skipped value?

### Examples  

**Example 1:**  
Input: `arr = [2,3,4,7,11], k = 5`  
Output: `9`  
*Explanation: The missing numbers are 1,5,6,8,9. The 5ᵗʰ missing is 9.*

**Example 2:**  
Input: `arr = [1,2,3,4], k = 2`  
Output: `6`  
*Explanation: The missing numbers are 5,6. The 2ⁿᵈ missing is 6.*

**Example 3:**  
Input: `arr = [5,6,7], k = 4`  
Output: `4`  
*Explanation: The missing numbers are 1,2,3,4. The 4ᵗʰ missing is 4.*

### Thought Process (as if you’re the interviewee)  
First, let's brute-force:  
- Start counting from 1, compare each value to the current array value.
- If they match, move the array pointer forward.
- If there's a mismatch, increment how many missing we've seen.
- Stop when we've seen k missing numbers.

But this is O(n + k), not optimal for large inputs.

Optimization:
- For any index i, the number of missing numbers before arr[i] is arr[i] - (i+1).
    - Example: arr = [2,3,4,7,11]. At i=3 (arr[3]=7), missing count = 7-4=3 (which are 1,5,6).
- With this, we can binary search:
    - For idx, if missing_left = arr[idx] - (idx+1).
    - If missing_left < k, missing number is after idx. Otherwise, it's before.
- Use binary search to find the smallest index where missing_left ≥ k.
- Finally, answer is left + k, accounting for the offset of actual numbers and missing.

Chosen approach: **Binary search** — O(log n), fast for large arrays.

### Corner cases to consider  
- arr starts above 1 (the first missing numbers may be all before arr).
- k is so large that it is beyond the largest element of arr.
- arr covers all numbers up to n (no missing below n, must extrapolate).
- arr has only one element.
- arr is consecutive; minimal missing numbers.
- k = 1.

### Solution

```python
def findKthPositive(arr, k):
    left, right = 0, len(arr)
    # Binary search for the first index where number of missing numbers < k
    while left < right:
        mid = (left + right) // 2
        # Count of missing numbers before arr[mid]
        missing = arr[mid] - (mid + 1)
        if missing < k:
            left = mid + 1
        else:
            right = mid
    # After search, kth missing is before arr[left] (could be beyond end)
    return left + k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  Binary search through the array; each operation computes missing count in O(1).

- **Space Complexity:** O(1)  
  No extra data structures; all work in constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose arr is very large and does not fit in memory. How do you approach it?  
  *Hint: Can you use streaming or external memory techniques?*

- What if arr may contain duplicates or is not sorted?  
  *Hint: Can you preprocess or adapt your approach?*

- Return all the k missing numbers instead of just the kᵗʰ.  
  *Hint: How can you generate the whole list efficiently?*

### Summary
This problem exemplifies the **"two pointers / binary search over answer"** pattern. The key trick is recognizing that the count of missing numbers up to an index can be computed directly, letting us binary search for the position before which k missing numbers occur. This pattern is powerful for problems involving "find kᵗʰ in absence/holes/gaps" in sorted data, as in range missing elements, locating missing IDs, etc.