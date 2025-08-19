### Leetcode 1053 (Medium): Previous Permutation With One Swap [Practice](https://leetcode.com/problems/previous-permutation-with-one-swap)

### Description  
Given an array of positive integers (possibly with duplicates), return the lexicographically **largest permutation that is strictly smaller** than the current array—a.k.a. the "previous permutation"—that can be achieved by swapping at most one pair of elements.  
If no such permutation exists (i.e., the array is already the smallest possible), return the array unchanged.

**Lexicographically smaller** means: at the first differing index, the output is smaller.  
**Only one swap** is allowed, so you must find the best possible position to do this.


### Examples  

**Example 1:**  
Input: `[3,2,1]`  
Output: `[3,1,2]`  
*Explanation: Swap 2 and 1 to get the next smaller permutation.*

**Example 2:**  
Input: `[1,1,5]`  
Output: `[1,1,5]`  
*Explanation: This array is already the smallest permutation; no swap can make it smaller.*

**Example 3:**  
Input: `[1,9,4,6,7]`  
Output: `[1,7,4,6,9]`  
*Explanation: Swap 9 and 7 (swap only once—largest index 7 that is smaller than 9).*

**Example 4:**  
Input: `[3,1,1,3]`  
Output: `[1,3,1,3]`  
*Explanation: Swap the first 3 with the first (rightmost) 1 to get the largest "smaller" permutation with one swap.*


### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try every possible one-swap and check each resulting array; pick the largest permutation that's still smaller than the original.  
  This is O(n²) and impractical for n up to 10,000.

- **Optimized Approach (Greedy, Single Pass):**  
  1. **Find the pivot:**  
     Traverse from right to left and find the first index `i` such that arr[i-1] > arr[i].  
     - All elements after i-1 are in non-increasing order.
     - arr[i-1] is the first spot you can reduce to get a smaller permutation.
  2. **Find the best candidate to swap with:**  
     Among elements to the right of arr[i-1], pick the **largest element less than arr[i-1]** (so you decrease as little as possible), and if duplicates, pick the rightmost one (to make the overall permutation as large as possible).
  3. Swap these two indices.
  4. Done! Only use one swap. If the array is already sorted ascending, no action needed—return as-is.

- **Why this works:**  
  Matching the pattern from "Next Permutation" in reverse, but because only one swap is allowed, there's no reversal/sorting after the swap. This guarantees O(n) time, O(1) space.


### Corner cases to consider  
- Array already sorted ascending (smallest permutation).
- Array already sorted descending (largest permutation).
- All elements identical.
- Input of length 1 (no possible swap).
- Multiple duplicates (must pick the rightmost).
- Swapping with equal element wouldn't change the permutation.


### Solution

```python
def prevPermOpt1(arr):
    n = len(arr)
    # Find the rightmost index where arr[i-1] > arr[i]
    i = n - 1
    while i > 0 and arr[i-1] <= arr[i]:
        i -= 1

    # If no such index is found, array is already the smallest
    if i == 0:
        return arr

    # arr[i-1] is the pivot: find the largest j to the right s.t. arr[j] < arr[i-1]
    j = n - 1
    while arr[j] >= arr[i-1]:
        j -= 1

    # If duplicates, need to find the leftmost one among equal arr[j]s
    while j > i and arr[j-1] == arr[j]:
        j -= 1

    # Swap arr[i-1] and arr[j]
    arr[i-1], arr[j] = arr[j], arr[i-1]
    return arr
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Single pass to find `i`, another pass (worst case n) to find `j`.
  - All inner steps are O(1).
- **Space Complexity:** O(1)
  - In-place swapping, only constant extra variables.


### Potential follow-up questions (as if you’re the interviewer)  

- **If allowed more than one swap, how can you get the truly previous permutation?**  
  *Hint: You'd need to extend the logic and possibly reverse a suffix like the normal permutation algorithm.*

- **Can this approach be generalized for lists with custom comparator rules?**  
  *Hint: How would you change comparison in step 2?*

- **If input is a linked list instead of an array, how would your approach change?**  
  *Hint: Consider traversal time, and the cost of searching and swapping nodes.*


### Summary
This problem uses a common **greedy permutation pattern**, much like the "Next Permutation" problem, but constrained to a **single swap**. The critical insight is identifying the rightmost point where the order drops, and then swapping with the **largest rightmost smaller element** to its right, handling duplicates carefully.  
This efficient O(n) solution is commonly applicable to single-swap or one-move permutation problems, and relates to array manipulation and greedy candidate selection.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
