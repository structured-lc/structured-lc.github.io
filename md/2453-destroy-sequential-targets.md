### Leetcode 2453 (Medium): Destroy Sequential Targets [Practice](https://leetcode.com/problems/destroy-sequential-targets)

### Description  
Given an array of integers `nums` and an integer `space`, you have a machine that, if seeded with value `x`, destroys all numbers in `nums` whose value has the same remainder as `x` when divided by `space` (i.e., all `y` in `nums` such that `(y % space) == (x % space)`).  
Your task:  
- Find the seed value from `nums` that will destroy the maximum number of targets.
- In case of a tie (multiple seeds destroy the same maximum number), return the smallest such value.

### Examples  

**Example 1:**  
Input: `nums = [3,7,8,1,1,5]`, `space = 2`  
Output: `1`  
*Explanation: Possible groups by remainder modulo 2: [3,7,1,1,5] (all odd),  (even).  
Seeding with any odd number (1, 3, 5, 7) destroys 5 targets.  
Of these, the smallest seed is `1`.*

**Example 2:**  
Input: `nums = [4,3,2,1,1]`, `space = 3`  
Output: `1`  
*Explanation: Remainders modulo 3: [1,4] → rem 1, [2] → rem 2, [3] → rem 0.  
Group for rem 1: [1,4,1] (= 3 targets), rem 0: [3] (= 1 target), rem 2: [2] (= 1 target).  
Pick the smallest value among those with the largest group (1 and 4 are possible seeds; minimum is `1`).*

**Example 3:**  
Input: `nums = [6,2,5]`, `space = 100`  
Output: `2`  
*Explanation: All numbers have unique remainders (since all < 100).  
Max number of targets is 1 for any seed.  
Minimum such value is `2`.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For each possible seed `x` in `nums`, count how many elements in `nums` it can destroy (`y % space == x % space`). Pick the minimum such `x` for the largest group.  
  But this is O(n²) as for each element you scan the list.
- **Optimized:**  
  - Since destroyable numbers are determined by remainder, group all numbers by their remainder modulo `space`.
  - Use a hash map to count the frequency for each remainder.
  - For each number, get the group size (`nums[i] % space`), and keep track of the minimum number for each group with the highest count.
  - This approach is O(n) for scanning and grouping.
- **Why optimized is chosen:**  
  - Reduces unnecessary repeated computation.
  - Grouping by mod class is natural and directly answers the "destroy all with same remainder" part.

### Corner cases to consider  
- All numbers in `nums` are equal.
- All numbers give the same remainder modulo `space`.
- All numbers have different remainders (group size always 1).
- Duplicates: ensure smallest seed is returned in case of ties.
- `nums` has only one element.
- `space` is 1 (all numbers have remainder 0).
- Large `nums` with repeated values, small `space`.

### Solution

```python
def destroy_targets(nums, space):
    # Dictionary to count how many nums have each remainder modulo space
    counts = dict()
    for num in nums:
        rem = num % space
        if rem not in counts:
            counts[rem] = 0
        counts[rem] += 1

    # Now, for each num, check the count of its remainder group
    max_count = 0
    result = float('inf')
    for num in nums:
        rem = num % space
        group_size = counts[rem]
        # If this group is bigger, or same size but num is smaller
        if group_size > max_count or (group_size == max_count and num < result):
            max_count = group_size
            result = num

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  *Building the counts map is O(n); checking all nums for optimal seed is O(n).*
- **Space Complexity:** O(min(n, space)),  
  *since at most `space` unique remainders, and the counts dictionary grows with either space or unique elements in nums (whichever is smaller).*

### Potential follow-up questions (as if you’re the interviewer)  

- What if `nums` is extremely large, and space is much smaller than len(nums)?  
  *Hint: Since remainders are bounded by `space`, can you compress/count without storing all of nums?*

- Can you return all possible minimum seeds if there are multiple?  
  *Hint: Store results in a list while tracking; output all matching minimum seeds.*

- If each seed has a "cost," how would you minimize cost while maximizing destroyed targets?  
  *Hint: Add a cost comparison in your tie-breaking logic.*

### Summary
This problem uses the **hash grouping/categorization** pattern, based on modulo arithmetic.  
It is often applied where grouping by a pattern or fixed key (e.g., anagrams, remainders, time-intervals) is efficient, and frequency analysis is required.  
This solution’s O(n) grouping + selection is a widely-used coding interview technique for counting and critical grouping tasks.