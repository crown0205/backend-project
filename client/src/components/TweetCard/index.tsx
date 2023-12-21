import React from "react";
import styled from "styled-components";

interface TweetCardProps {}

const TweetCard: React.FC<TweetCardProps> = ({}) => {
  return (
    <Card>
      <div className="cardContentBox">
        <div className="image">E</div>
        <div className="contentBox">
          <span className="nameBox">
            <p className="name">USER NAME</p>
            <small className="id">@NAME</small>
            <small className="time">TIME</small>
          </span>
          <span className="content">CONTENT</span>

          <div className="editInputBox">
            <input type="text" />

            <div className="editButtonBox">
              <button>Update</button>
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div className="buttonBox">
        <button>❌</button>
        <button>✏️</button>
      </div>
    </Card>
  );
};

export default TweetCard;

const Card = styled.ol`
  height: auto;
  padding: 8px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 1px 1px 13px 1px #00000026;
  border-radius: 6px;

  .cardContentBox {
    width: 100%;
    display: flex;
    gap: 10px;

    .contentBox {
      width: 100%;

      .nameBox {
        font-weight: 600;
        color: #111;
        display: flex;
        gap: 6px;

        .name {
          font-size: 14px;
          font-weight: 800;
        }

        .id {
          font-size: 12px;
          color: #1f6ede;
          cursor: pointer;
        }

        .time {
          font-size: 12px;
          color: #444444;
        }
      }

      .content {
        font-size: 14px;
        color: #111111;
        margin-top: 6px;
      }

      .editInputBox {
        margin-top: 16px;
        width: 100%;

        > input {
          width: 100%;
          background-color: #fff;
          border-color: #bebebe;
        }

        .editButtonBox {
          display: flex;
          justify-content: end;
          gap: 6px;

          button {
            padding: 2px 6px;
            margin: 0;
            width: fit-content;
            font-size: 14px;
            font-weight: 600;
            border: none;
          }

          :nth-child(1) {
            background-color: #5c94e4;
          }
          :nth-child(2) {
            background-color: #f34b4b;
          }
        }
      }
    }
  }

  .image {
    width: 40px;
    height: 40px;
    background-color: #dfd9d9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #111;
    font-size: 22px;
    font-weight: 800;
  }

  .contentBox {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 0;
  }

  .buttonBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px 2px;

    button {
      font-size: 12px;

      padding: 0;
      margin: 0;
      background-color: #fff;
      border: none;
    }
  }
`;
