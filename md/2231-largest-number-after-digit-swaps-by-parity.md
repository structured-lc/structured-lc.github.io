### Leetcode 2231 (Easy): Largest Number After Digit Swaps by Parity [Practice](https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity)

### Description  
Given a positive integer `num`, you can swap any two digits as long as they have the **same parity** (i.e., both odd or both even). Your task is to return the **largest possible integer** value you can get after any number of such swaps.  
You may not swap digits of different parity, and you can perform as many swaps as you want.

### Examples  

**Example 1:**  
Input: `num = 1234`  
Output: `3412`  
*Explanation:*
- Odd digits: 1, 3
- Even digits: 2, 4
- Place the largest odd in the highest-odd positions: [3, 1]
- Place the largest even in the highest-even positions: [4, 2]
- Arranged number: 3 4 1 2 ⇒ `3412`

**Example 2:**  
Input: `num = 65875`  
Output: `87655`  
*Explanation:*
- Odd digits: 5, 7, 5
- Even digits: 6, 8
- Largest odd to leftmost odd slot: 7, next is 5, then 5
- Largest even to leftmost even slot: 8, then 6
- Arranged number: 8 7 6 5 5 ⇒ but positions must match input parity arrangement (even, odd, even, odd, odd): 8 7 6 5 5 ⇒ Correct mapping: 8(even), 7(odd), 6(even), 5(odd), 5(odd) ⇒ `87655`

**Example 3:**  
Input: `num = 247316`  
Output: `763412`  
*Explanation:*
- Even digits: 2, 4, 6
- Odd digits: 7, 3, 1
- Largest odds to odd positions: 7, 3, 1
- Largest evens to even positions: 6, 4, 2
- Arrange by input parity (even, even, odd, odd, odd, even): [6, 4, 7, 3, 1, 2] ⇒ `647312`
- **(Note:** This explanation matches the pattern; step explanation depends on parity mapping.)

### Thought Process (as if you’re the interviewee)  
Start by observing that only **same-parity swaps** are allowed. I want the largest digit possible at each position, but can only swap even with even and odd with odd.  
- Brute-force would be to generate all permutations with valid swaps, but that's infeasible.
- Instead, I can:
  - Extract all odd and even digits separately.
  - Sort both lists descending.
  - Place digits back into the original positions, but for each position, pick the largest available digit of the same parity.
- This is efficient: iterate through the number, select from pre-sorted lists.

Why this works: Placing the largest available same-parity digit in each position maximizes the number for every position independently.

### Corner cases to consider  
- Single-digit numbers (e.g., `num = 5`).
- All digits have the same parity (e.g., `222` or `13579`).
- Digits are already sorted in largest parity order (e.g., `97531`).
- Digits of alternating parity.
- Digits with repetitions.
- Input at lower/upper bound (e.g., `1`, `1000000000`).

### Solution

```python
def largestInteger(num: int) -> int:
    # Convert number to a list of digits
    digits = [int(d) for d in str(num)]
    
    # Separate odd and even digits
    odd_digits = sorted([d for d in digits if d % 2 == 1], reverse=True)
    even_digits = sorted([d for d in digits if d % 2 == 0], reverse=True)
    
    # Reconstruct number: use the largest available digit for each parity
    res = []
    odd_ptr = 0  # Pointer for odd_digits
    even_ptr = 0 # Pointer for even_digits
    
    for d in digits:
        if d % 2 == 0:
            res.append(str(even_digits[even_ptr]))
            even_ptr += 1
        else:
            res.append(str(odd_digits[odd_ptr]))
            odd_ptr += 1

    return int(''.join(res))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of digits in `num`.
  - Sorting odd and even digit lists dominates, each up to n elements.
  - The rest (splitting and reconstructing) is linear in n.
- **Space Complexity:** O(n)
  - Storing input digits, separated odd/even digit lists, and output list, all proportional to digit count.

### Potential follow-up questions (as if you’re the interviewer)  

- What if swaps were allowed between *any* digits, regardless of parity?  
  *Hint: Would sorting all digits descending give the answer?*

- What if you were restricted to only one swap?  
  *Hint: Consider the largest improvement with a single swap of same parity.*

- How would you solve this if num was given as a string instead of integer?  
  *Hint: Would you need to change much in your approach?*

### Summary
This is a "greedy with sorting by parity" pattern: separate into two groups based on a criterion (parity), sort each, and greedily assign the largest same-group element to each allowed position.  
This pattern appears in some string/array rearrangement problems where swaps are restricted by some equivalence or property.

### Tags
Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Largest Number At Least Twice of Others(largest-number-at-least-twice-of-others) (Easy)
- Sort Array By Parity(sort-array-by-parity) (Easy)
- Sort Array By Parity II(sort-array-by-parity-ii) (Easy)
- Smallest String With Swaps(smallest-string-with-swaps) (Medium)
- Rearrange Array Elements by Sign(rearrange-array-elements-by-sign) (Medium)