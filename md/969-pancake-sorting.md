### Leetcode 969 (Medium): Pancake Sorting [Practice](https://leetcode.com/problems/pancake-sorting)

### Description  
Given an array of integers, your task is to sort it **only** by performing a series of "pancake flips".  
A "pancake flip" means selecting an integer `k` (1 ≤ k ≤ arr.length), and reversing the prefix `arr[0:k]`.  
Your output should be a list of `k` values (the sequence of flips). Any output that sorts the array in at most 10 × arr.length flips is acceptable.  
You do **not** return the sorted array, only the sequence of `k` values representing your flips.  

### Examples  

**Example 1:**  
Input: `arr = [3,2,4,1]`  
Output: `[3,4,2,3,2]`  
*Explanation: The sequence of flips might be:*  
Step 1: Flip first 3 → `[4,2,3,1]`  
Step 2: Flip first 4 → `[1,3,2,4]`  
Step 3: Flip first 2 → `[3,1,2,4]`  
Step 4: Flip first 3 → `[2,1,3,4]`  
Step 5: Flip first 2 → `[1,2,3,4]`  
(Any answer with ≤ 10 × n flips that sorts the array is accepted.)

**Example 2:**  
Input: `arr = [1,2,3]`  
Output: `[]`  
*Explanation: Already sorted, no flips needed.*

**Example 3:**  
Input: `arr = [2,4,1,3]`  
Output: `[3,4,2,3]`  
*Explanation:  
Flip 3: `[1,4,2,3]`  
Flip 4: `[3,2,4,1]`  
Flip 2: `[2,3,4,1]`  
Flip 3: `[4,3,2,1]`  
(Final sequence that sorts to `[1,2,3,4]`.)*

### Thought Process (as if you’re the interviewee)  
- The basic operation here is a prefix reversal: we can flip any number of first k elements (for 1 ≤ k ≤ n). Regular sorting algorithms generally don't restrict you in this way.
- Brute-force would try all flip sequences, but this is exponential and not practical.
- This problem is similar to **selection sort** but with a twist:  
  - Find the maximum unsorted element, bring it to the front (if not already), then flip it to its correct position at the back of the unsorted region.
  - For each pass:
    - Find the index of the largest unsorted element (among arr[0:max_pos])
    - If the largest is not already at max_pos:
      - If not at 0th index: flip its index+1 to bring it to the front.
      - Then flip max_pos+1 to bring it into its correct place.
    - Shrink the unsorted portion (max_pos - 1) and repeat.
- This ensures that after each iteration, the largest remaining number is at the end of the unsorted portion.
- Trade-offs: It's not the most optimal sort overall, but in terms of number of flips, it's guaranteed to complete in O(n) flips (where n = length of array), well below the allowed 10×n flips.

### Corner cases to consider  
- Array with 1 element: `[1]` → should give `[]`.
- Array already sorted: `[1,2,3,4]` → should give `[]`.
- Array reverse sorted: `[4,3,2,1]`.
- Duplicates: Not possible; problem guarantees all numbers are unique.
- Empty array: Not possible as per problem constraints, but returning `[]` would be logical.
- Maximum element already in correct position: Should not flip unnecessarily.

### Solution

```python
def pancakeSort(arr):
    # Helper function to reverse the first k elements (simulate pancake flip)
    def flip(sublist, k):
        left, right = 0, k - 1
        while left < right:
            sublist[left], sublist[right] = sublist[right], sublist[left]
            left += 1
            right -= 1

    result = []
    n = len(arr)
    for curr_size in range(n, 1, -1):
        # Find the index of the max element in arr[0:curr_size]
        max_idx = 0
        for i in range(curr_size):
            if arr[i] > arr[max_idx]:
                max_idx = i

        if max_idx == curr_size - 1:
            continue # Already in correct place

        # Flip max to front if not already
        if max_idx != 0:
            result.append(max_idx + 1)
            flip(arr, max_idx + 1)

        # Flip max to its correct position at curr_size-1
        result.append(curr_size)
        flip(arr, curr_size)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - For each pass (n times), finding the max requires scanning up to n elements, hence O(n²) overall.
- **Space Complexity:** O(1)  
  - No extra data structures proportional to input size; only a few variables and the result list for flip indices.

### Potential follow-up questions (as if you’re the interviewer)  

- What if duplicates are allowed in the array?  
  *Hint: Sorting by value alone won’t work; how would you handle repeated values or stable ordering?*

- Can you optimize the number of flips used?  
  *Hint: Is there a way to avoid unnecessary flips when elements are already at their position?*

- Could you do this in less than O(n²) time?  
  *Hint: Think about whether an auxiliary structure for max tracking could help.*

### Summary
This solution uses a **greedy, selection-sort-like approach** that places each maximum element in its correct place using at most two flips per element.  
The main coding pattern is "bring-to-front, then to-position", which is applicable in variants of in-place sorting with limited operations.  
This pattern also appears in problems that limit you to a particular operation (subarray flipping, reversal, etc.).  
No advanced data structures required—just simulation and careful iteration.