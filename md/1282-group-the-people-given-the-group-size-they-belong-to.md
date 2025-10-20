### Leetcode 1282 (Medium): Group the People Given the Group Size They Belong To [Practice](https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to)

### Description  
Given an array groupSizes, where groupSizes[i] is the size of the group that person with ID i must belong to, group all individuals such that each group has exactly the size specified by the members, and every person is included in exactly one group. Return the grouping as a list of groups (lists of IDs).

### Examples  
**Example 1:**  
Input: `groupSizes = [3,3,3,3,3,1,3]`  
Output: `[[5], [0,1,2], [3,4,6]]`  
*Explanation: ID 5 wants a group of 1; others want size 3, so group [0,1,2] and [3,4,6] form with remaining people.*

**Example 2:**  
Input: `groupSizes = [2,1,3,3,3,2]`  
Output: `[[1], [0,5], [2,3,4]]`  
*Explanation: [1] alone, [0,5] in size 2, [2,3,4] in size 3 as required.*

**Example 3:**  
Input: `groupSizes = [2,2,1,1,1,2,2,2]`  
Output: `[[2],[3],[4],[0,1], [5,6], ]`  
*Explanation: The singletons are grouped alone, and groups of size 2 are formed using the remaining IDs.*


### Thought Process (as if you’re the interviewee)  
First, group the indices (IDs) by their required group size. Use a dictionary to collect all IDs for each group size.

Then, for each group size, split the list of IDs into slices of that size. Whenever you collect enough IDs for one group, append to the output and start the next. This ensures no one is left out, and all group sizes match the requirement.

This approach is efficient—essentially two passes: one for grouping by size, one for assembling result groups.


### Corner cases to consider  
- Multiple possible valid outputs (order may vary; that's fine).
- Every person requests a group of size 1.
- No group size appears more times than its required group size.
- All group sizes are the same.


### Solution

```python
def group_the_people(groupSizes):
    groups_by_size = {}
    for person_id, size in enumerate(groupSizes):
        if size not in groups_by_size:
            groups_by_size[size] = []
        groups_by_size[size].append(person_id)
    result = []
    for size, ids in groups_by_size.items():
        for i in range(0, len(ids), size):
            result.append(ids[i:i+size])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of people (single pass to collect by size, another to group).
- **Space Complexity:** O(n): dictionary and output require up to n IDs' storage.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle streaming/grouping people as requests arrive live?
  *Hint: Maintain running buckets and emit groups once full.*
- Can you do this without extra space?
  *Hint: Difficult if output must not overwrite input, but in-place grouping could be designed.*
- What if IDs are not strictly 0,…,n-1, but unique strings?
  *Hint: All logic still works; just group using the provided IDs instead of indices.*

### Summary
This utilizes the bucket-sort/group-by pattern, often used in grouping/partitioning problems. The technique is applicable anywhere you must allocate resources or assign entities based on pre-specified group constraints.


### Flashcard
Group indices by group size, then partition each group into slices of the required size to form the final groups.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy)

### Similar Problems
- Rabbits in Forest(rabbits-in-forest) (Medium)
- Maximum Number of Groups With Increasing Length(maximum-number-of-groups-with-increasing-length) (Hard)