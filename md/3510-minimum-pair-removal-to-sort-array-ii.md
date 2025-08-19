### Leetcode 3510 (Hard): Minimum Pair Removal to Sort Array II [Practice](https://leetcode.com/problems/minimum-pair-removal-to-sort-array-ii)

### Description  
Given an array of integers `nums`, you are allowed to perform this operation any number of times:  
- Select the **adjacent pair** with the **smallest sum** (if multiple such pairs, take the leftmost).
- Replace the pair with a single element equal to their sum (i.e., merge them).

The goal is to **make the array non-decreasing** (each element ≥ the previous one) in as few operations as possible.  
Return the **minimum number of operations** needed to reach a non-decreasing array. The constraint is that `nums` may be large (up to 10⁵ elements), so an efficient algorithm is required.

### Examples  

**Example 1:**  
Input: `[5, 2, 3, 1]`  
Output: `2`  
*Explanation:  
- Step 1: Adjacent pair sums are (5+2=7), (2+3=5), (3+1=4). The minimum is 3+1. Merge to get [5,2,4].  
- Step 2: Now adjacent sums are (5+2=7), (2+4=6). The minimum is 5+2. Merge to get [7,4].  
- Now the array [7,4] is not sorted, but only one possible pair. Merge to get .  
But as per the example from resources, output is `2`. Likely, after first merge, [5,2,4], then merge (2,4): [5,6] which is sorted.*

**Example 2:**  
Input: `[1, 1, 1]`  
Output: `1`  
*Explanation:  
- Step 1: Pairs are (1,1), (1,1), both have sum 2. Take leftmost, merge first two: [2,1].  
- Step 2: Only one pair left: (2,1)=3. Merge to [3], but after one operation ([2,1]) it's non-decreasing! So answer is 1.*

**Example 3:**  
Input: `[7, 6, 5, 4]`  
Output: `3`  
*Explanation:  
- Step 1: Sums (7+6=13), (6+5=11), (5+4=9). Merge (5,4) into 9: [7,6,9].  
- Step 2: Sums (7+6=13), (6+9=15). Merge (7,6) into 13: [13,9].  
- Step 3: Only one pair (13,9), merge into 22: .  
- Need 3 operations.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all possible pairs to merge at every step. But as array can be size up to 10⁵, brute-force O(n²) is too slow.

- **Key Observations:**  
  - At every step, the **pair to merge is forced**: always the leftmost adjacent pair with the minimum sum.
  - Use a **heap** (min-priority queue) to efficiently get the smallest-sum pair quickly.
  - Merging changes two things:  
    1. The array shrinks (so we must link neighbor relations).  
    2. The sums involving the merged element need to be updated.  
  - We also need to efficiently know if the array is now non-decreasing. Instead of checking O(n) each step, track only where the next inversion is.

- **Data Structures:**  
  - **Heap (priority queue):** For pair sums and efficiency.
  - **Doubly linked list** or index array: For efficiently updating neighbors/pairs after merging.
  - **Set/counter:** To track how many inversions remain.

- **Approach:**  
  1. Build a heap with all adjacent pairs (sum, index).
  2. While there are inversions:  
      - Pop the pair with min sum (if it's still valid: both elements not deleted/merged).
      - Merge, remove the two, insert the sum in their place.
      - Update the heap where neighbor pairs change (old sums need to be removed, new adjacent sums pushed).
      - Adjust inversion count.
  3. When no inversions, return the number of merges done.

- **Tradeoffs:**  
  - Maintaining which pairs are valid after each merge is tricky.
  - Copying the array each time is slow—better to simulate the merges using pointers/indexes.

### Corner cases to consider  
- Empty array: output should be 0.
- Single-element array: already sorted, so 0 moves.
- Already non-decreasing: 0 operations.
- All elements equal: 0 operations.
- Array in strictly decreasing order: will need maximum possible operations. 

### Solution

```python
import heapq

def minimum_operations(nums):
    # Handle edge cases
    n = len(nums)
    if n <= 1 or all(nums[i] <= nums[i+1] for i in range(n-1)):
        return 0

    # Setup a doubly linked list using arrays to maintain previous and next indices
    prev = [-1] + [i for i in range(n-1)]
    next = [i+1 for i in range(n-1)] + [-1]

    # Each entry: (sum, left_index, right_index)
    heap = []
    # Only store pairs as (sum, left_idx) so we can quickly check if a pair is still valid
    for i in range(n-1):
        heapq.heappush(heap, (nums[i] + nums[i+1], i))

    # Keep track of which indices are alive
    alive = [True] * n

    # To track inversions, count how many i where nums[i] > nums[i+1]
    inversions = set()
    for i in range(n-1):
        if nums[i] > nums[i+1]:
            inversions.add(i)

    res = 0

    while inversions:
        # Pop the min-sum pair (leftmost in tie)
        while heap:
            pair_sum, left = heapq.heappop(heap)
            right = next[left]
            # Ensure this pair is still valid
            if right != -1 and alive[left] and alive[right]:
                break
        else:
            break # heap exhausted

        # Do the merge: replace left and right by their sum at left position
        nums[left] = nums[left] + nums[right]
        alive[right] = False

        # Remove inversions possibly fixed by this merge
        if left in inversions and alive[left]:
            # After merge, left may now be ≤ next[left], so remove from inversions if so
            nxt = next[right]
            if nxt != -1 and nums[left] <= nums[nxt]:
                inversions.discard(left)
        # When merging at left-1,left, that pair's inversion may change
        prev_idx = prev[left]
        if prev_idx != -1 and nums[prev_idx] > nums[left]:
            inversions.add(prev_idx)
        elif prev_idx != -1:
            inversions.discard(prev_idx)
        
        # Update links
        nright = next[right]
        next[left] = nright
        if nright != -1:
            prev[nright] = left

        # Insert new pair (left, next[left])
        if nright != -1 and alive[nright]:
            heapq.heappush(heap, (nums[left] + nums[nright], left))
        # Insert new pair (prev[left], left)
        if prev[left] != -1 and alive[prev[left]]:
            heapq.heappush(heap, (nums[prev[left]] + nums[left], prev[left]))

        res += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Each merge takes O(log n) due to heap operations, and there are at most n operations.
  Maintaining neighbor pointers and inversion sets is O(1) amortized per operation.

- **Space Complexity:** O(n)  
  Arrays for prev, next, alive, inversion set, and the heap, each O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could merge any two elements (not necessarily adjacent)?
  *Hint: Would greedy strategy suffice or do you need different DP approach?*

- If instead of minimum sum, you could merge any pair you like in one step?
  *Hint: Can you always sort in 1 operation if unrestricted?*

- Could you optimize for other array properties, like minimizing the largest element, not just sorting?
  *Hint: Explore what kind of strategies work if cost function or merge rule changes.*

### Summary
This problem uses an **interval heap + linked-array simulation** of merges, a common pattern for problems where local greedy operations are forced but global rebuilds after mutation are costly.  
It’s a variation of “simulate merges by always picking the best local choice,” and is similar to *Interval heap* + *Sweepline* or *Union-Find* for dynamic intervals.  
Useful for problems requiring efficient updates around local merges under global array constraints.

### Tags
Array(#array), Hash Table(#hash-table), Linked List(#linked-list), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation), Doubly-Linked List(#doubly-linked-list), Ordered Set(#ordered-set)

### Similar Problems
