/*

    acquireListId = (boardId, type) => {
        const board = this.state[boardId];

        if (board) {
            return board[type];
        } else {
            return null;
        }
    };

    selectList = (boardId, type, value) => {
        let board = this.state[boardId] ? this.state[boardId] : {};

        board = { ...board, [type]: value };

        this.setState({ [boardId]: board });
    };

    renderActivitySpec = (item) => {
        const { id: boardId } = item;

        const startValue = this.acquireListId(boardId, START_TYPE);

        const endValue = this.acquireListId(boardId, END_TYPE);

        const selectListGen = (type) => (value) => {
            this.selectList(boardId, type, value);
        };

        return (
            <Specification>
                <SubHeader>List Activity</SubHeader>
                <ActivityContainer>
                    <IntegrationListMenu
                        board={item}
                        type={START_TYPE}
                        value={startValue}
                        selectValue={selectListGen(START_TYPE)}
                    />
                    <Arrow>
                        <HiArrowNarrowRight />
                    </Arrow>
                    <IntegrationListMenu
                        board={item}
                        type={END_TYPE}
                        value={endValue}
                        selectValue={selectListGen(END_TYPE)}
                    />
                </ActivityContainer>
            </Specification>
        );
};*/
