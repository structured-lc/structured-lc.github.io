### Leetcode 1773 (Easy): Count Items Matching a Rule [Practice](https://leetcode.com/problems/count-items-matching-a-rule)

### Description  
Given a list of items, where each item is represented as a list of three strings `[type, color, name]`, and two rule parameters: `ruleKey` and `ruleValue`. You need to count how many items have their attribute (`type`, `color`, or `name`, as selected by `ruleKey`) exactly matching `ruleValue`.  
This is a filtration and counting problem on a list of lists, with a mapping between string rule keys and index positions in each inner list.

### Examples  

**Example 1:**  
Input:  
`items = [["phone","blue","pixel"], ["computer","silver","lenovo"], ["phone","gold","iphone"]]`,  
`ruleKey = "color"`,  
`ruleValue = "silver"`  
Output:  
`1`  
*Explanation: Only the second item has color equal to "silver".*

**Example 2:**  
Input:  
`items = [["phone","blue","pixel"], ["computer","silver","phone"], ["phone","gold","iphone"]]`,  
`ruleKey = "type"`,  
`ruleValue = "phone"`  
Output:  
`2`  
*Explanation: First and third items have type equal to "phone".*

**Example 3:**  
Input:  
`items = [["a","b","c"]]`,  
`ruleKey = "name"`,  
`ruleValue = "c"`  
Output:  
`1`  
*Explanation: Only one item, and its name is "c".*

### Thought Process (as if you’re the interviewee)  

- Start by mapping the `ruleKey` (`"type"`, `"color"`, `"name"`) to the appropriate index in each item. The mapping is:
  - `"type"` → index 0  
  - `"color"` → index 1  
  - `"name"` → index 2  
- Iterate over each item in the input list.
- For each item, compare the value at the mapped index to `ruleValue`.  
- Increment a counter if there's a match.
- This is a classic linear scan with conditional logic. No need for hashing or advanced data structures because the dataset is small and the access patterns are predictable.
- The brute-force method is already optimal for this problem, as each item must be checked because the rules can target any of the three attributes.

### Corner cases to consider  
- The list of items is empty → should return 0.
- There is only one item.
- All items match the rule.
- No items match the rule.
- `ruleValue` is an empty string, or matches an empty string in items.
- Invalid `ruleKey` (should not occur per problem guarantees, but robust code might assert this).

### Solution

```python
def countMatches(items, ruleKey, ruleValue):
    # Step 1: Map ruleKey to index
    if ruleKey == "type":
        idx = 0
    elif ruleKey == "color":
        idx = 1
    elif ruleKey == "name":
        idx = 2
    else:
        # This shouldn't happen per problem constraints
        return 0
        
    match_count = 0
    # Step 2: Iterate over items and count matches
    for item in items:
        if item[idx] == ruleValue:
            match_count += 1
    return match_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of items. We scan each item once and perform constant-time operations per item.
- **Space Complexity:** O(1), since we only use a fixed number of extra variables for counting and indexing, and do not use any extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of rule types grows, or the mapping is dynamic?  
  *Hint: Could use a dictionary to map rule keys to indices for flexibility.*

- How would your code change if there could be a range or a set of acceptable values for `ruleValue`?  
  *Hint: Use a set or additional conditions in the inner loop.*

- Could you filter more complex queries, like "color is green and type is not phone"?  
  *Hint: This requires a more generalized filtering function—possibly with lambdas or composite predicates.*

### Summary  
This problem is a straightforward example of **filtering and counting** within a 2D list structure, using **mapping from rule strings to column indices**. The approach shown here—mapping key strings to indices, looping with a predicate, and counting matches—is a common pattern for problems involving structured data filtering, and is widely applicable in CSV parsing, database-type querying, or log file analysis.

### Tags
Array(#array), String(#string)

### Similar Problems
